"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { MotionReveal } from "@/components/animation/MotionReveal";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/field";
import { Panel } from "@/components/ui/panel";
import { Popover } from "@/components/ui/popover";
import { bookingStaySchema, guestDetailsSchema } from "@/lib/booking/validation";
import {
  buildSuggestion,
  getSuggestedRoomSlugs,
  toDateValue,
} from "@/lib/booking/suggestions";
import type { BookingStayInput, GuestDetailsInput } from "@/lib/booking/validation";
import { roomAmenityLabels, rooms, type Room } from "@/lib/content/rooms";
import type { BookingSuggestionType } from "@/lib/booking/types";
import { useAppLocale } from "@/components/layout/LocaleProvider";
import { useClientTranslations } from "@/hooks/useClientTranslations";

type Step = 0 | 1 | 2 | 3;

const steps: Array<"stepStay" | "stepRoom" | "stepGuest" | "stepConfirm"> = [
  "stepStay",
  "stepRoom",
  "stepGuest",
  "stepConfirm",
];

export function BookingFlow({
  onDone,
  preferredRoomSlug,
  suggestionType,
  initialStay,
}: {
  onDone?: () => void;
  preferredRoomSlug?: string;
  suggestionType?: BookingSuggestionType;
  initialStay?: Partial<BookingStayInput>;
}) {
  const { locale } = useAppLocale();
  const { t } = useClientTranslations();
  const [step, setStep] = useState<Step>(0);
  const [selectedRoomSlug, setSelectedRoomSlug] = useState<string | undefined>(
    preferredRoomSlug,
  );
  const [isChecking, setIsChecking] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const suggestionOrder = useMemo(
    () => getSuggestedRoomSlugs(suggestionType ?? "weekend"),
    [suggestionType],
  );

  const stayDefaults = useMemo(() => {
    const suggestion = buildSuggestion(suggestionType ?? "weekend");

    return {
      checkIn: initialStay?.checkIn ?? suggestion.checkIn ?? toDateValue(new Date()),
      checkOut:
        initialStay?.checkOut ??
        suggestion.checkOut ??
        toDateValue(addDays(new Date(), 2)),
      adults: initialStay?.adults ?? suggestion.adults ?? 2,
      children: initialStay?.children ?? suggestion.children ?? 0,
    };
  }, [initialStay, suggestionType]);

  const stayForm = useForm<BookingStayInput>({
    resolver: zodResolver(bookingStaySchema),
    defaultValues: stayDefaults,
  });

  const stayValues = useWatch({ control: stayForm.control });

  const displayCheckIn = useMemo(() => format(new Date(stayValues.checkIn ?? stayDefaults.checkIn), "dd.MM.yyyy"), [stayValues.checkIn, stayDefaults.checkIn]);
  const displayCheckOut = useMemo(() => format(new Date(stayValues.checkOut ?? stayDefaults.checkOut), "dd.MM.yyyy"), [stayValues.checkOut, stayDefaults.checkOut]);

  const guestForm = useForm<GuestDetailsInput>({
    resolver: zodResolver(guestDetailsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const availableRooms = useMemo(() => {
    const ordered = suggestionOrder
      .map((slug) => rooms.find((room) => room.slug === slug))
      .filter((room): room is Room => Boolean(room));
    const otherRooms = rooms.filter((room) => !suggestionOrder.includes(room.slug));

    return [...ordered, ...otherRooms].filter(
      (room) => room.capacity >= (stayValues.adults ?? 1) + (stayValues.children ?? 0),
    );
  }, [stayValues.adults, stayValues.children, suggestionOrder]);

  useEffect(() => {
    if (!isChecking) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsChecking(false);
      if (!selectedRoomSlug && availableRooms[0]) {
        setSelectedRoomSlug(availableRooms[0].slug);
      }
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [availableRooms, isChecking, selectedRoomSlug]);

  async function handleStayContinue() {
    const isValid = await stayForm.trigger();
    if (!isValid) {
      return;
    }
    setIsChecking(true);
    setStep(1);
  }

  async function handleGuestContinue() {
    const isValid = await guestForm.trigger();
    if (!isValid) {
      return;
    }
    setStep(3);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 pb-1">
        {steps.map((label, index) => (
          <div
            key={label}
            className={`flex-1 rounded-full px-2 py-1 text-center text-[9px] uppercase tracking-[0.2em] ${
              step === index
                ? "bg-accent-red text-white"
                : "border border-black/10 bg-black/5 text-foreground/55"
            }`}
          >
            {t("booking." + steps[index])}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div
              key="stay"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <Panel className="grid gap-3 p-3 sm:p-6">
                <label className="space-y-1.5 text-[10px] text-foreground/80 sm:text-sm">
                  <span>{t("booking.dates")}</span>
                  <Popover
                    isOpen={isDatePopoverOpen}
                    onOpenChange={setIsDatePopoverOpen}
                    align="start"
                    content={
                      <div className="space-y-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                          {t("booking.selectDates")}
                        </p>
                        <div className="space-y-3">
                          <div>
                            <label className="mb-1 block text-sm text-foreground">
                              {t("booking.checkInLabel")}
                            </label>
                            <div className="relative">
                              <input
                                type="date"
                                className="h-12 w-full rounded-sm border border-black/10 bg-black/5 pl-4 pr-10 text-sm text-foreground outline-none placeholder:text-foreground/35 focus:border-accent-red [&::-webkit-calendar-picker-indicator]:opacity-0"
                                value={stayValues.checkIn}
                                onChange={(event) => {
                                  stayForm.setValue("checkIn", event.target.value);
                                  if (stayValues.checkOut && new Date(event.target.value) >= new Date(stayValues.checkOut)) {
                                    stayForm.setValue("checkOut", toDateValue(addDays(new Date(event.target.value), 1)));
                                  }
                                }}
                                min={toDateValue(new Date())}
                              />
                              <button
                                type="button"
                                className="absolute inset-0 h-full w-full cursor-pointer bg-transparent"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const input = e.currentTarget.previousSibling as HTMLInputElement;
                                  input?.showPicker?.();
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="mb-1 block text-sm text-foreground">
                              {t("booking.checkOutLabel")}
                            </label>
                            <div className="relative">
                              <input
                                type="date"
                                className="h-12 w-full rounded-sm border border-black/10 bg-black/5 pl-4 pr-10 text-sm text-foreground outline-none placeholder:text-foreground/35 focus:border-accent-red [&::-webkit-calendar-picker-indicator]:opacity-0"
                                value={stayValues.checkOut}
                                min={stayValues.checkIn}
                                onChange={(event) => stayForm.setValue("checkOut", event.target.value)}
                              />
                              <button
                                type="button"
                                className="absolute inset-0 h-full w-full cursor-pointer bg-transparent"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const input = e.currentTarget.previousSibling as HTMLInputElement;
                                  input?.showPicker?.();
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  >
                    <button
                      type="button"
                      className="flex h-12 w-full items-center justify-between rounded-sm border border-black/10 bg-black/5 px-4 text-left text-sm text-foreground/70 transition-colors hover:bg-black/[0.08]"
                    >
                      <span className="font-medium text-foreground text-sm">
                        {displayCheckIn} — {displayCheckOut}
                      </span>
                    </button>
                  </Popover>
                </label>
                <label className="space-y-1.5 text-[10px] text-foreground/80 sm:text-sm">
                  <span>{t("booking.guests")}</span>
                  <div className="flex h-12 items-center rounded-sm border border-black/10 bg-black/5 px-4">
                    <div className="flex w-full items-center justify-between">
                      <button
                        type="button"
                        className="flex h-10 w-12 items-center justify-center text-xl text-foreground/70"
                        onClick={() => stayForm.setValue("adults", Math.max(1, (stayValues.adults ?? 2) - 1))}
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-foreground">{stayValues.adults ?? 2}</span>
                      <button
                        type="button"
                        className="flex h-10 w-12 items-center justify-center text-xl text-foreground/70"
                        onClick={() => stayForm.setValue("adults", Math.min(4, (stayValues.adults ?? 2) + 1))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </label>
              </Panel>
              <Button className="w-full mb-1" onClick={handleStayContinue}>
                {t("booking.continue")}
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Button>
            </motion.div>
          ) : null}

          {step === 1 ? (
            <motion.div
              key="room"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              {isChecking ? (
                <Panel className="flex items-center gap-3 p-3">
                  <Loader2 className="h-4 w-4 animate-spin text-accent-red" />
                  <p className="text-[10px] text-foreground/80 sm:text-sm">{t("booking.checking")}</p>
                </Panel>
              ) : null}

              <div className="grid gap-3">
                {availableRooms.map((room, index) => (
                  <MotionReveal key={room.slug} delay={index * 0.05}>
                    <button
                      type="button"
                      className={`w-full rounded-sm border p-2.5 text-left sm:p-5 ${
                        selectedRoomSlug === room.slug
                          ? "border-accent-red bg-black/[0.08]"
                          : "border-black/10 bg-black/[0.03]"
                      }`}
                      onClick={() => setSelectedRoomSlug(room.slug)}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-serif text-base text-foreground sm:text-2xl">
                            {room.name[locale as "ua" | "en"]}
                          </p>
                          <p className="mt-1 line-clamp-2 text-[10px] leading-5 text-secondary sm:mt-2 sm:text-sm">
                            {room.shortDescription[locale as "ua" | "en"]}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-[9px] uppercase tracking-[0.2em] text-secondary">
                            {t("booking.from")}
                          </p>
                          <p className="mt-1 text-base text-foreground sm:text-2xl">
                            ₴{room.rateFrom.toLocaleString("uk-UA")}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {room.amenities.slice(0, 4).map((amenity) => (
                          <span
                            key={amenity}
                            className="rounded-full border border-black/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-foreground/65 sm:px-3 sm:py-1 sm:text-[11px]"
                          >
                            {roomAmenityLabels[amenity][locale as "ua" | "en"]}
                          </span>
                        ))}
                      </div>
                    </button>
                  </MotionReveal>
                ))}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="secondary" onClick={() => setStep(0)} className="w-full sm:w-auto">
                  {t("booking.back")}
                </Button>
                <Button
                  onClick={() => {
                    if (selectedRoomSlug) setStep(2);
                  }}
                  className="w-full sm:w-auto"
                >
                  {t("booking.continue")}
                </Button>
              </div>
            </motion.div>
          ) : null}

          {step === 2 ? (
            <motion.div
              key="guest"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <Panel className="grid gap-3 p-3 sm:p-6">
                <Input placeholder={t("booking.name")} {...guestForm.register("name")} />
                <Input placeholder={t("booking.email")} type="email" {...guestForm.register("email")} />
                <Input placeholder={t("booking.phone")} {...guestForm.register("phone")} />
                <Textarea placeholder={t("booking.notes")} {...guestForm.register("notes")} />
              </Panel>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="secondary" onClick={() => setStep(1)} className="w-full sm:w-auto">
                  {t("booking.back")}
                </Button>
                <Button onClick={handleGuestContinue} className="w-full sm:w-auto">
                  {t("booking.continue")}
                </Button>
              </div>
            </motion.div>
          ) : null}

          {step === 3 ? (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <Panel className="space-y-3 p-3 sm:p-6">
                <div className="grid gap-1.5 text-[10px] text-foreground/75 sm:text-sm">
                  <p>{guestForm.getValues().name}</p>
                  <p>{guestForm.getValues().email}</p>
                  <p>{guestForm.getValues().phone}</p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => {
                    setIsSubmitted(true);
                    window.setTimeout(() => onDone?.(), 1200);
                  }}
                >
                  {t("booking.reserve")}
                </Button>
              </Panel>
              {isSubmitted ? (
                <Panel className="border-accent-red/30 bg-accent-red/10 p-3 sm:p-6">
                  <p className="font-serif text-lg text-foreground sm:text-2xl">{t("booking.successTitle")}</p>
                  <p className="mt-2 text-[10px] leading-6 text-foreground/75 sm:text-sm">{t("booking.successText")}</p>
                </Panel>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
  );
}

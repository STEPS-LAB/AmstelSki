"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { MotionReveal } from "@/components/animation/MotionReveal";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/field";
import { Panel } from "@/components/ui/panel";
import { bookingStaySchema, guestDetailsSchema } from "@/lib/booking/validation";
import {
  buildSuggestion,
  getSuggestedRoomSlugs,
  toDateValue,
} from "@/lib/booking/suggestions";
import type { BookingStayInput, GuestDetailsInput } from "@/lib/booking/validation";
import type { AppLocale } from "@/i18n/routing";
import { roomAmenityLabels, rooms, type Room } from "@/lib/content/rooms";
import { pickLocalized } from "@/lib/i18n";
import type { BookingSuggestionType } from "@/lib/booking/types";
import { BookingSummary } from "./BookingSummary";

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
  const locale = useLocale() as AppLocale;
  const t = useTranslations("booking");
  const [step, setStep] = useState<Step>(0);
  const [selectedRoomSlug, setSelectedRoomSlug] = useState<string | undefined>(
    preferredRoomSlug,
  );
  const [isChecking, setIsChecking] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const guestForm = useForm<GuestDetailsInput>({
    resolver: zodResolver(guestDetailsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const stayValues = useWatch({ control: stayForm.control });

  const availableRooms = useMemo(() => {
    const ordered = suggestionOrder
      .map((slug) => rooms.find((room) => room.slug === slug))
      .filter((room): room is Room => Boolean(room));
    const otherRooms = rooms.filter((room) => !suggestionOrder.includes(room.slug));

    return [...ordered, ...otherRooms].filter(
      (room) => room.capacity >= (stayValues.adults ?? 1) + (stayValues.children ?? 0),
    );
  }, [stayValues.adults, stayValues.children, suggestionOrder]);

  const selectedRoom =
    availableRooms.find((room) => room.slug === selectedRoomSlug) ?? availableRooms[0];

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
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <div className="flex items-center gap-1 overflow-x-auto overflow-y-hidden pb-1">
          {steps.map((label, index) => (
            <div
              key={label}
              className={`flex-shrink-0 rounded-full px-2 py-1 text-[9px] uppercase tracking-[0.2em] ${
                step === index
                  ? "bg-white text-black"
                  : "border border-white/10 bg-white/5 text-white/55"
              }`}
            >
              {t(label)}
            </div>
          ))}
        </div>

        <div className="lg:hidden">
          <BookingSummary
            stay={{
              checkIn: stayValues.checkIn ?? stayDefaults.checkIn,
              checkOut: stayValues.checkOut ?? stayDefaults.checkOut,
              adults: stayValues.adults ?? stayDefaults.adults,
              children: stayValues.children ?? stayDefaults.children,
            }}
            room={selectedRoom}
            className="bg-black/20"
          />
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
                <label className="space-y-1.5 text-[10px] text-white/80 sm:text-sm">
                  <span>{t("checkIn")}</span>
                  <Controller
                    control={stayForm.control}
                    name="checkIn"
                    render={({ field }) => <Input type="date" min={toDateValue(new Date())} {...field} />}
                  />
                </label>
                <label className="space-y-1.5 text-[10px] text-white/80 sm:text-sm">
                  <span>{t("checkOut")}</span>
                  <Controller
                    control={stayForm.control}
                    name="checkOut"
                    render={({ field }) => <Input type="date" min={stayValues.checkIn} {...field} />}
                  />
                </label>
                <label className="space-y-1.5 text-[10px] text-white/80 sm:text-sm">
                  <span>{t("adults")}</span>
                  <Controller
                    control={stayForm.control}
                    name="adults"
                    render={({ field }) => (
                      <Input
                        type="number"
                        min={1}
                        max={4}
                        value={field.value}
                        onChange={(event) => field.onChange(Number(event.target.value))}
                      />
                    )}
                  />
                </label>
                <label className="space-y-1.5 text-[10px] text-white/80 sm:text-sm">
                  <span>{t("children")}</span>
                  <Controller
                    control={stayForm.control}
                    name="children"
                    render={({ field }) => (
                      <Input
                        type="number"
                        min={0}
                        max={4}
                        value={field.value}
                        onChange={(event) => field.onChange(Number(event.target.value))}
                      />
                    )}
                  />
                </label>
              </Panel>
              <Button className="w-full" size="sm" onClick={handleStayContinue}>
                {t("continue")}
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
                  <p className="text-[10px] text-white/80 sm:text-sm">{t("checking")}</p>
                </Panel>
              ) : null}

              <div className="grid gap-3">
                {availableRooms.map((room, index) => (
                  <MotionReveal key={room.slug} delay={index * 0.05}>
                    <button
                      type="button"
                      className={`w-full rounded-sm border p-2.5 text-left sm:p-5 ${
                        selectedRoomSlug === room.slug
                          ? "border-accent-red bg-white/[0.06]"
                          : "border-white/10 bg-white/[0.03]"
                      }`}
                      onClick={() => setSelectedRoomSlug(room.slug)}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-serif text-base text-white sm:text-2xl">
                            {pickLocalized(room.name, locale)}
                          </p>
                          <p className="mt-1 line-clamp-2 text-[10px] leading-5 text-secondary sm:mt-2 sm:text-sm">
                            {pickLocalized(room.shortDescription, locale)}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-[9px] uppercase tracking-[0.2em] text-secondary">
                            from
                          </p>
                          <p className="mt-1 text-base text-white sm:text-2xl">
                            ₴{room.rateFrom.toLocaleString("uk-UA")}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {room.amenities.slice(0, 4).map((amenity) => (
                          <span
                            key={amenity}
                            className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-white/65 sm:px-3 sm:py-1 sm:text-[11px]"
                          >
                            {pickLocalized(roomAmenityLabels[amenity], locale)}
                          </span>
                        ))}
                      </div>
                    </button>
                  </MotionReveal>
                ))}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="secondary" onClick={() => setStep(0)} size="sm" className="w-full sm:w-auto">
                  {t("back")}
                </Button>
                <Button
                  onClick={() => {
                    if (selectedRoomSlug) setStep(2);
                  }}
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  {t("continue")}
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
                <Input placeholder={t("name")} {...guestForm.register("name")} />
                <Input placeholder={t("email")} type="email" {...guestForm.register("email")} />
                <Input placeholder={t("phone")} {...guestForm.register("phone")} />
                <Textarea placeholder={t("notes")} {...guestForm.register("notes")} />
              </Panel>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="secondary" onClick={() => setStep(1)} size="sm" className="w-full sm:w-auto">
                  {t("back")}
                </Button>
                <Button onClick={handleGuestContinue} size="sm" className="w-full sm:w-auto">
                  {t("continue")}
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
                <div className="grid gap-1.5 text-[10px] text-white/75 sm:text-sm">
                  <p>{guestForm.getValues().name}</p>
                  <p>{guestForm.getValues().email}</p>
                  <p>{guestForm.getValues().phone}</p>
                </div>
                <Button
                  className="w-full"
                  size="sm"
                  onClick={() => {
                    setIsSubmitted(true);
                    window.setTimeout(() => onDone?.(), 1200);
                  }}
                >
                  {t("reserve")}
                </Button>
              </Panel>
              {isSubmitted ? (
                <Panel className="border-accent-red/30 bg-accent-red/10 p-3 sm:p-6">
                  <p className="font-serif text-lg text-white sm:text-2xl">{t("successTitle")}</p>
                  <p className="mt-2 text-[10px] leading-6 text-white/75 sm:text-sm">{t("successText")}</p>
                </Panel>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <BookingSummary
        stay={{
          checkIn: stayValues.checkIn ?? stayDefaults.checkIn,
          checkOut: stayValues.checkOut ?? stayDefaults.checkOut,
          adults: stayValues.adults ?? stayDefaults.adults,
          children: stayValues.children ?? stayDefaults.children,
        }}
        room={selectedRoom}
        className="hidden lg:block"
      />
    </div>
  );
}

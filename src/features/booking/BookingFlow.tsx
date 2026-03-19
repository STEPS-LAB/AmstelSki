"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
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

  function applySuggestion(type: BookingSuggestionType) {
    const suggestion = buildSuggestion(type);
    stayForm.reset(suggestion);
    setIsChecking(true);
    setStep(0);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {(["tonight", "weekend", "business"] as const).map((type) => (
            <button
              key={type}
              type="button"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/70 hover:bg-white/10"
              onClick={() => applySuggestion(type)}
            >
              <Sparkles className="mr-2 h-3.5 w-3.5 text-accent-red" />
              {t(type)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {steps.map((label, index) => (
            <div
              key={label}
              className={`rounded-full px-3 py-2 text-xs uppercase tracking-[0.2em] ${
                step === index
                  ? "bg-white text-black"
                  : "border border-white/10 bg-white/5 text-white/55"
              }`}
            >
              {t(label)}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div
              key="stay"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4"
            >
              <Panel className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-white/80">
                  <span>{t("checkIn")}</span>
                  <Controller
                    control={stayForm.control}
                    name="checkIn"
                    render={({ field }) => <Input type="date" min={toDateValue(new Date())} {...field} />}
                  />
                </label>
                <label className="space-y-2 text-sm text-white/80">
                  <span>{t("checkOut")}</span>
                  <Controller
                    control={stayForm.control}
                    name="checkOut"
                    render={({ field }) => <Input type="date" min={stayValues.checkIn} {...field} />}
                  />
                </label>
                <label className="space-y-2 text-sm text-white/80">
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
                <label className="space-y-2 text-sm text-white/80">
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
              <Button className="w-full sm:w-auto" onClick={handleStayContinue}>
                {t("continue")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          ) : null}

          {step === 1 ? (
            <motion.div
              key="room"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4"
            >
              {isChecking ? (
                <Panel className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-accent-red" />
                  <p className="text-sm text-white/80">{t("checking")}</p>
                </Panel>
              ) : null}

              <div className="grid gap-4">
                {availableRooms.map((room, index) => (
                  <MotionReveal key={room.slug} delay={index * 0.05}>
                    <button
                      type="button"
                      className={`w-full rounded-sm border p-5 text-left ${
                        selectedRoomSlug === room.slug
                          ? "border-accent-red bg-white/[0.06]"
                          : "border-white/10 bg-white/[0.03]"
                      }`}
                      onClick={() => setSelectedRoomSlug(room.slug)}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="font-serif text-2xl text-white">
                            {pickLocalized(room.name, locale)}
                          </p>
                          <p className="mt-2 max-w-xl text-sm leading-6 text-secondary">
                            {pickLocalized(room.shortDescription, locale)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs uppercase tracking-[0.2em] text-secondary">
                            from
                          </p>
                          <p className="mt-2 text-2xl text-white">
                            ₴{room.rateFrom.toLocaleString("uk-UA")}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {room.amenities.slice(0, 4).map((amenity) => (
                          <span
                            key={amenity}
                            className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/65"
                          >
                            {pickLocalized(roomAmenityLabels[amenity], locale)}
                          </span>
                        ))}
                      </div>
                    </button>
                  </MotionReveal>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" onClick={() => setStep(0)}>
                  {t("back")}
                </Button>
                <Button
                  onClick={() => {
                    if (selectedRoomSlug) setStep(2);
                  }}
                >
                  {t("continue")}
                </Button>
              </div>
            </motion.div>
          ) : null}

          {step === 2 ? (
            <motion.div
              key="guest"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4"
            >
              <Panel className="grid gap-4">
                <Input placeholder={t("name")} {...guestForm.register("name")} />
                <Input placeholder={t("email")} type="email" {...guestForm.register("email")} />
                <Input placeholder={t("phone")} {...guestForm.register("phone")} />
                <Textarea placeholder={t("notes")} {...guestForm.register("notes")} />
              </Panel>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" onClick={() => setStep(1)}>
                  {t("back")}
                </Button>
                <Button onClick={handleGuestContinue}>{t("continue")}</Button>
              </div>
            </motion.div>
          ) : null}

          {step === 3 ? (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4"
            >
              <Panel className="space-y-4">
                <div className="grid gap-2 text-sm text-white/75">
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
                  {t("reserve")}
                </Button>
              </Panel>
              {isSubmitted ? (
                <Panel className="border-accent-red/30 bg-accent-red/10">
                  <p className="font-serif text-2xl text-white">{t("successTitle")}</p>
                  <p className="mt-3 text-sm leading-7 text-white/75">{t("successText")}</p>
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
      />
    </div>
  );
}

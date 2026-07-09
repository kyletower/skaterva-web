'use client';

import * as React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  fetchAvailability,
  fetchPartyPackages,
  formatPackagePrice,
  formatSlotTime,
  getTodayInRinkTimezone,
  submitPartyReservation,
} from '@/lib/parties/client-api';
import type { AvailableSlot, PartyPackage } from '@/types/party-reservation';

type ReservePartyButtonProps = ButtonProps;

type ReservationFormState = {
  packages: PartyPackage[];
  selectedPackageId: string;
  date: string;
  slots: AvailableSlot[];
  selectedSlot: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  guestCount: string;
  childName: string;
  notes: string;
  loadingPackages: boolean;
  loadingSlots: boolean;
  submitting: boolean;
  error: string | null;
  successMessage: string | null;
};

function createInitialFormState(): ReservationFormState {
  return {
    packages: [],
    selectedPackageId: '',
    date: getTodayInRinkTimezone(),
    slots: [],
    selectedSlot: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    guestCount: '',
    childName: '',
    notes: '',
    loadingPackages: false,
    loadingSlots: false,
    submitting: false,
    error: null,
    successMessage: null,
  };
}

/**
 * Opens the party reservation dialog without changing the button appearance.
 */
export function ReservePartyButton(props: ReservePartyButtonProps) {
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = React.useState(createInitialFormState);

  const closeDialog = React.useCallback(() => {
    setOpen(false);
    setFormState(createInitialFormState());
  }, []);

  const openDialog = React.useCallback(() => {
    setFormState({
      ...createInitialFormState(),
      loadingPackages: true,
    });
    setOpen(true);
  }, []);

  React.useEffect(() => {
    if (!open || !formState.loadingPackages) {
      return;
    }

    let cancelled = false;

    fetchPartyPackages()
      .then((loadedPackages) => {
        if (cancelled) {
          return;
        }

        setFormState((current) => ({
          ...current,
          packages: loadedPackages,
          selectedPackageId: loadedPackages[0]?.id ?? '',
          loadingPackages: false,
          loadingSlots: Boolean(loadedPackages[0]?.id),
        }));
      })
      .catch((fetchError: Error) => {
        if (cancelled) {
          return;
        }

        setFormState((current) => ({
          ...current,
          loadingPackages: false,
          error: fetchError.message,
        }));
      });

    return () => {
      cancelled = true;
    };
  }, [open, formState.loadingPackages]);

  React.useEffect(() => {
    if (
      !open ||
      formState.loadingPackages ||
      !formState.loadingSlots ||
      !formState.selectedPackageId ||
      !formState.date
    ) {
      return;
    }

    let cancelled = false;

    fetchAvailability(formState.date, formState.selectedPackageId)
      .then((result) => {
        if (cancelled) {
          return;
        }

        const packageSlots =
          result.availability.find(
            (entry) => entry.package.id === formState.selectedPackageId
          )?.slots ?? [];

        setFormState((current) => ({
          ...current,
          slots: packageSlots,
          selectedSlot: '',
          loadingSlots: false,
          error: null,
        }));
      })
      .catch((fetchError: Error) => {
        if (cancelled) {
          return;
        }

        setFormState((current) => ({
          ...current,
          slots: [],
          selectedSlot: '',
          loadingSlots: false,
          error: fetchError.message,
        }));
      });

    return () => {
      cancelled = true;
    };
  }, [
    open,
    formState.loadingPackages,
    formState.loadingSlots,
    formState.selectedPackageId,
    formState.date,
  ]);

  const selectedPackage = formState.packages.find(
    (partyPackage) => partyPackage.id === formState.selectedPackageId
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formState.selectedPackageId || !formState.selectedSlot) {
      setFormState((current) => ({
        ...current,
        error: 'Please choose a package and available time.',
      }));
      return;
    }

    setFormState((current) => ({
      ...current,
      submitting: true,
      error: null,
      successMessage: null,
    }));

    try {
      const reservation = await submitPartyReservation({
        packageId: formState.selectedPackageId,
        startsAt: formState.selectedSlot,
        contactName: formState.contactName.trim(),
        contactEmail: formState.contactEmail.trim(),
        contactPhone: formState.contactPhone.trim() || undefined,
        guestCount: formState.guestCount
          ? Number(formState.guestCount)
          : undefined,
        childName: formState.childName.trim() || undefined,
        notes: formState.notes.trim() || undefined,
      });

      setFormState((current) => ({
        ...current,
        submitting: false,
        successMessage: `Request received for ${formatSlotTime(reservation.starts_at)}. We will confirm your party soon.`,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        guestCount: '',
        childName: '',
        notes: '',
        selectedSlot: '',
      }));
    } catch (submitError) {
      setFormState((current) => ({
        ...current,
        submitting: false,
        error:
          submitError instanceof Error
            ? submitError.message
            : 'Failed to submit reservation',
      }));
    }
  }

  return (
    <>
      <Button {...props} onClick={openDialog} />
      <Dialog
        open={open}
        onClose={closeDialog}
        title="Reserve Your Party"
        description="Choose a package, pick an open time, and send your request."
        className="w-[min(100%-2rem,36rem)]"
      >
        {formState.loadingPackages ? (
          <p className="text-sm text-slate-400">Loading packages...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Package</span>
              <select
                value={formState.selectedPackageId}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    selectedPackageId: event.target.value,
                    loadingSlots: true,
                    slots: [],
                    selectedSlot: '',
                  }))
                }
                className="flex h-12 w-full rounded-[16px] border border-white/10 bg-white/5 px-4 text-sm text-slate-50"
              >
                {formState.packages.map((partyPackage) => (
                  <option key={partyPackage.id} value={partyPackage.id}>
                    {partyPackage.name} —{' '}
                    {formatPackagePrice(partyPackage.price_cents)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Date</span>
              <Input
                type="date"
                value={formState.date}
                min={getTodayInRinkTimezone()}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    date: event.target.value,
                    loadingSlots: true,
                    slots: [],
                    selectedSlot: '',
                  }))
                }
                aria-label="Party date"
              />
            </label>

            <div className="space-y-2">
              <span className="text-sm text-slate-300">Available times</span>
              {formState.loadingSlots ? (
                <p className="text-sm text-slate-400">
                  Checking availability...
                </p>
              ) : formState.slots.length === 0 ? (
                <p className="rounded-[16px] border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-400">
                  No open times for this date
                  {selectedPackage
                    ? ` (${selectedPackage.duration_minutes} min)`
                    : ''}
                  .
                </p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2">
                  {formState.slots.map((slot) => (
                    <button
                      key={slot.startsAt}
                      type="button"
                      onClick={() =>
                        setFormState((current) => ({
                          ...current,
                          selectedSlot: slot.startsAt,
                        }))
                      }
                      className={`rounded-[16px] border px-4 py-3 text-left text-sm transition ${
                        formState.selectedSlot === slot.startsAt
                          ? 'border-accent-cyan/60 bg-accent-cyan/10 text-white'
                          : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/8'
                      }`}
                    >
                      {new Intl.DateTimeFormat('en-US', {
                        timeZone: 'America/New_York',
                        hour: 'numeric',
                        minute: '2-digit',
                      }).format(new Date(slot.startsAt))}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                placeholder="Parent or guardian name"
                value={formState.contactName}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    contactName: event.target.value,
                  }))
                }
                aria-label="Contact name"
                required
              />
              <Input
                placeholder="Email"
                type="email"
                value={formState.contactEmail}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    contactEmail: event.target.value,
                  }))
                }
                aria-label="Email address"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                placeholder="Phone"
                type="tel"
                value={formState.contactPhone}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    contactPhone: event.target.value,
                  }))
                }
                aria-label="Phone number"
              />
              <Input
                placeholder="Guest count"
                type="number"
                min={1}
                max={50}
                value={formState.guestCount}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    guestCount: event.target.value,
                  }))
                }
                aria-label="Guest count"
              />
            </div>

            <Input
              placeholder="Birthday child's name"
              value={formState.childName}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  childName: event.target.value,
                }))
              }
              aria-label="Birthday child name"
            />

            <Textarea
              placeholder="Notes or special requests"
              value={formState.notes}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  notes: event.target.value,
                }))
              }
              aria-label="Notes"
            />

            {formState.error ? (
              <p className="rounded-[16px] border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {formState.error}
              </p>
            ) : null}

            {formState.successMessage ? (
              <p className="rounded-[16px] border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-3 text-sm text-cyan-100">
                {formState.successMessage}
              </p>
            ) : null}

            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={formState.submitting || !formState.selectedSlot}
            >
              {formState.submitting
                ? 'Submitting...'
                : 'Submit Reservation Request'}
            </Button>
          </form>
        )}
      </Dialog>
    </>
  );
}

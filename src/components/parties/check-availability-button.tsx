'use client';

import * as React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  fetchAvailability,
  fetchPartyPackages,
  formatPackagePrice,
  getTodayInRinkTimezone,
} from '@/lib/parties/client-api';
import type { AvailableSlot, PartyPackage } from '@/types/party-reservation';

type CheckAvailabilityButtonProps = ButtonProps;

const initialAvailabilityState = {
  packages: [] as PartyPackage[],
  selectedPackageId: '',
  date: getTodayInRinkTimezone(),
  slots: [] as AvailableSlot[],
  loadingPackages: false,
  loadingSlots: false,
  error: null as string | null,
};

/**
 * Opens the availability dialog without changing the button appearance.
 */
export function CheckAvailabilityButton(props: CheckAvailabilityButtonProps) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(initialAvailabilityState);

  const closeDialog = React.useCallback(() => {
    setOpen(false);
    setState(initialAvailabilityState);
  }, []);

  const openDialog = React.useCallback(() => {
    setState({
      ...initialAvailabilityState,
      date: getTodayInRinkTimezone(),
      loadingPackages: true,
    });
    setOpen(true);
  }, []);

  React.useEffect(() => {
    if (!open || !state.loadingPackages) {
      return;
    }

    let cancelled = false;

    fetchPartyPackages()
      .then((loadedPackages) => {
        if (cancelled) {
          return;
        }

        setState((current) => ({
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

        setState((current) => ({
          ...current,
          loadingPackages: false,
          error: fetchError.message,
        }));
      });

    return () => {
      cancelled = true;
    };
  }, [open, state.loadingPackages]);

  React.useEffect(() => {
    if (
      !open ||
      state.loadingPackages ||
      !state.loadingSlots ||
      !state.selectedPackageId ||
      !state.date
    ) {
      return;
    }

    let cancelled = false;

    fetchAvailability(state.date, state.selectedPackageId)
      .then((result) => {
        if (cancelled) {
          return;
        }

        const packageSlots =
          result.availability.find(
            (entry) => entry.package.id === state.selectedPackageId
          )?.slots ?? [];

        setState((current) => ({
          ...current,
          slots: packageSlots,
          loadingSlots: false,
          error: null,
        }));
      })
      .catch((fetchError: Error) => {
        if (cancelled) {
          return;
        }

        setState((current) => ({
          ...current,
          slots: [],
          loadingSlots: false,
          error: fetchError.message,
        }));
      });

    return () => {
      cancelled = true;
    };
  }, [
    open,
    state.loadingPackages,
    state.selectedPackageId,
    state.date,
    state.loadingSlots,
  ]);

  const selectedPackage = state.packages.find(
    (partyPackage) => partyPackage.id === state.selectedPackageId
  );

  return (
    <>
      <Button {...props} onClick={openDialog} />
      <Dialog
        open={open}
        onClose={closeDialog}
        title="Check Availability"
        description="Browse open party times for your preferred date."
      >
        {state.loadingPackages ? (
          <p className="text-sm text-slate-400">Loading...</p>
        ) : (
          <div className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Package</span>
              <select
                value={state.selectedPackageId}
                onChange={(event) =>
                  setState((current) => ({
                    ...current,
                    selectedPackageId: event.target.value,
                    loadingSlots: true,
                    slots: [],
                  }))
                }
                className="flex h-12 w-full rounded-[16px] border border-white/10 bg-white/5 px-4 text-sm text-slate-50"
              >
                {state.packages.map((partyPackage) => (
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
                value={state.date}
                min={getTodayInRinkTimezone()}
                onChange={(event) =>
                  setState((current) => ({
                    ...current,
                    date: event.target.value,
                    loadingSlots: true,
                    slots: [],
                  }))
                }
                aria-label="Party date"
              />
            </label>

            {selectedPackage ? (
              <p className="text-sm text-slate-400">
                {selectedPackage.duration_minutes}-minute parties on open rink
                days.
              </p>
            ) : null}

            {state.error ? (
              <p className="rounded-[16px] border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {state.error}
              </p>
            ) : null}

            {state.loadingSlots ? (
              <p className="text-sm text-slate-400">Checking availability...</p>
            ) : state.slots.length === 0 ? (
              <p className="rounded-[16px] border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-400">
                No open times on this date.
              </p>
            ) : (
              <ul className="grid gap-2 sm:grid-cols-2">
                {state.slots.map((slot) => (
                  <li
                    key={slot.startsAt}
                    className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100"
                  >
                    {new Intl.DateTimeFormat('en-US', {
                      timeZone: 'America/New_York',
                      hour: 'numeric',
                      minute: '2-digit',
                    }).format(new Date(slot.startsAt))}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Dialog>
    </>
  );
}

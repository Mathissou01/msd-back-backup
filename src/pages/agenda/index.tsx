import { format, getDay, parse, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Calendar,
  CalendarProps,
  dateFnsLocalizer,
  Event,
  EventPropGetter,
} from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import { useQuery } from "@apollo/client";
import React, { ComponentType, useCallback, useEffect, useState } from "react";
import {
  GetTimeEvents,
  GetTimeDays,
  GetTimeSlots,
} from "src/graphql/queries/events.graphql";
import Header from "../../components/Header/Header";
import "./agenda-page.scss";

const locales = {
  fr: fr,
};
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const DnDCalendar = withDragAndDrop<ICalendarEvent>(
  Calendar as ComponentType<CalendarProps<ICalendarEvent>>,
);

interface IEvent {
  // id: number;
  attributes: {
    title: string;
    description?: string;
    allDay?: boolean;
    start?: string;
    end?: string;
  };
}

interface ICalendarEvent extends Event {
  id: number;
  type: string;
  title: string;
  description?: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
  resource?: any;
}

export default function AgendaPage() {
  const {
    data: timeEventsData,
    loading: eventsLoading,
    error: eventsError,
  } = useQuery(GetTimeEvents);
  const {
    data: timeSlotsData,
    loading: slotsLoading,
    error: slotsError,
  } = useQuery(GetTimeSlots);
  const {
    data: timeDaysData,
    loading: daysLoading,
    error: daysError,
  } = useQuery(GetTimeDays);
  const errors = [eventsError, slotsError, daysError].filter(
    Boolean || undefined,
  );
  const loading = eventsLoading || slotsLoading || daysLoading;
  const [firstLoad, setFirstLoad] = useState(false);

  const [events, setEvents] = useState<ICalendarEvent[]>([]);

  const updateEvents = useCallback(() => {
    const timeEvents: any = timeEventsData?.timeEvents?.data ?? [];
    const timeSlots: any = timeSlotsData?.timeSlots?.data ?? [];
    const timeDays: any = timeDaysData?.timeDays?.data ?? [];
    let i = 0;
    setEvents([
      ...timeEvents.map((event: IEvent) => {
        return {
          id: i++,
          type: "event",
          title: event.attributes.title,
          description: event.attributes.description,
          allDay: event.attributes.allDay,
          start: event.attributes.start
            ? new Date(event.attributes.start)
            : undefined,
          end: event.attributes.end
            ? new Date(event.attributes.end)
            : undefined,
        };
      }),
      ...timeSlots.map((event: IEvent) => {
        return {
          id: i++,
          type: "slot",
          title: event.attributes.title,
          description: event.attributes.description,
          allDay: event.attributes.allDay,
          start: event.attributes.start
            ? new Date(event.attributes.start)
            : undefined,
          end: event.attributes.end
            ? new Date(event.attributes.end)
            : undefined,
        };
      }),
      ...timeDays.map((event: IEvent) => {
        return {
          id: i++,
          type: "day",
          title: event.attributes.title,
          description: event.attributes.description,
          allDay: event.attributes.allDay,
          start: event.attributes.start
            ? new Date(event.attributes.start)
            : undefined,
          end: event.attributes.end
            ? new Date(event.attributes.end)
            : undefined,
        };
      }),
    ]);
    setFirstLoad(true);
  }, [timeEventsData, timeSlotsData, timeDaysData]);

  useEffect(() => {
    if (!loading && events.length === 0 && !firstLoad) {
      updateEvents();
    }
  }, [events, loading, firstLoad, updateEvents]);

  const eventPropGetter = useCallback<EventPropGetter<ICalendarEvent>>(
    (event, start, end, isSelected) => ({
      ...(isSelected && {
        style: {
          backgroundColor: "#000",
        },
      }),
      ...(event.type && {
        className: `c-Agenda__Type_${event.type}`,
      }),
    }),
    [],
  );

  const onEventResize: withDragAndDropProps<ICalendarEvent>["onEventResize"] = (
    data,
  ) => {
    let { event, start, end } = data;
    setEvents((currentEvents) => {
      const firstEvent: ICalendarEvent = {
        id: event.id,
        type: event.type,
        title: event.title,
        start: new Date(start),
        end: new Date(end),
      };
      return [...currentEvents, firstEvent]
        .reduce((result: ICalendarEvent[], { id, ...rest }: ICalendarEvent) => {
          result[id] = {
            ...(result[id] || {}),
            id,
            ...rest,
          };
          return result;
        }, [])
        .filter((i) => i);
    });
  };

  const onEventDrop: withDragAndDropProps<ICalendarEvent>["onEventDrop"] = (
    data,
  ) => {
    let { event, start, end } = data;
    setEvents((currentEvents) => {
      const firstEvent: ICalendarEvent = {
        id: event.id,
        type: event.type,
        title: event.title,
        start: new Date(start),
        end: new Date(end),
      };
      return [...currentEvents, firstEvent]
        .reduce((result: ICalendarEvent[], { id, ...rest }: ICalendarEvent) => {
          result[id] = {
            ...(result[id] || {}),
            id,
            ...rest,
          };
          return result;
        }, [])
        .filter((i) => i);
    });
  };

  if (errors && errors.length > 0) {
    errors.forEach((error) => console.error("error", error));
    return null;
  }

  return (
    <>
      <Header />
      <main>
        <div className={"o-Page__Content c-Agenda"}>
          <h1> Agenda </h1>
          {loading ? (
            <p>Loading...</p>
          ) : events && events.length > 0 ? (
            <>
              <DnDCalendar
                defaultView="month"
                events={events}
                eventPropGetter={eventPropGetter}
                localizer={localizer}
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                resizable
                popup
                tooltipAccessor={(event: ICalendarEvent) =>
                  event.description ?? ""
                }
                className={"c-Agenda__Calendar"}
              />
            </>
          ) : (
            <p>No results.</p>
          )}
        </div>
      </main>
    </>
  );
}

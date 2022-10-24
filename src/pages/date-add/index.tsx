import fr from "date-fns/locale/fr";
import { useMutation } from "@apollo/client";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import React, { useEffect, useState } from "react";
import {
  CreateTimeDay,
  CreateTimeEvent,
  CreateTimeSlot,
} from "src/graphql/queries/events.graphql";
import Header from "../../components/Header/Header";
import "./date-add-page.scss";

registerLocale("fr", fr);
setDefaultLocale("fr");

interface ITimeSlot {
  title: string;
  description: string;
  allDay: boolean;
  start: Date | null;
  end: Date | null;
}

interface ITimeDay {
  title: string;
  description: string;
  allDay: boolean;
  start: Date | null;
  end: Date | null;
}

interface ITimeEvent {
  title: string;
  description: string;
  allDay: boolean;
  start: Date | null;
  end: Date | null;
}

export default function DateAddPage() {
  /** TimeSlot **/
  /* form */
  const [slotTitle, setSlotTitle] = useState<string>("Créneau RDV n°1");
  const [slotDescription, setSlotDescription] = useState<string>(
    "Ceci est un Créneau RDV de demande.",
  );
  const [slotStartDate, setSlotStartDate] = useState<Date | null>(null);
  const [slotEndDate, setSlotEndDate] = useState<Date | null>(null);
  const [timeSlotFormData, setTimeSlotFormData] = React.useState<ITimeSlot>();
  useEffect(() => {
    setTimeSlotFormData({
      title: slotTitle,
      description: slotDescription,
      allDay: false,
      start: slotStartDate,
      end: slotEndDate,
    });
  }, [slotTitle, slotDescription, slotStartDate, slotEndDate]);

  /* mutation */
  const [createTimeSlotFunction, { data: createTimeSlotData }] =
    useMutation(CreateTimeSlot);
  useEffect(() => {
    console.log(JSON.stringify(createTimeSlotData, null, 2));
  }, [createTimeSlotData]);
  const handleTimeSlotFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (timeSlotFormData && !!Object.keys(timeSlotFormData).length) {
      await createTimeSlotFunction({
        variables: {
          data: {
            title: timeSlotFormData.title,
            description: timeSlotFormData.description,
            start: timeSlotFormData.start
              ? timeSlotFormData.start?.toISOString()
              : null,
            end: timeSlotFormData.end
              ? timeSlotFormData.end?.toISOString()
              : null,
            allDay: timeSlotFormData.allDay,
            publishedAt: new Date().toISOString(),
          },
        },
      });
    }
  };

  /** TimeDay **/
  /* form */
  const [dayTitle, setDayTitle] = useState<string>("Jour de Collecte n°1");
  const [dayDescription, setDayDescription] = useState<string>(
    "Ceci est un Jour de collecte.",
  );
  const [dayStartDate, setDayStartDate] = useState<Date | null>(null);
  const [dayEndDate, setDayEndDate] = useState<Date | null>(null);
  const [timeDayFormData, setTimeDayFormData] = React.useState<ITimeDay>();
  useEffect(() => {
    setTimeDayFormData({
      title: dayTitle,
      description: dayDescription,
      allDay: false,
      start: dayStartDate,
      end: dayEndDate,
    });
  }, [dayTitle, dayDescription, dayStartDate, dayEndDate]);

  /* mutation */
  const [createTimeDayFunction, { data: createTimeDayData }] =
    useMutation(CreateTimeDay);
  useEffect(() => {
    console.log(JSON.stringify(createTimeDayData, null, 2));
  }, [createTimeDayData]);
  const handleTimeDayFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (timeDayFormData && !!Object.keys(timeDayFormData).length) {
      await createTimeDayFunction({
        variables: {
          data: {
            title: timeDayFormData.title,
            description: timeDayFormData.description,
            start: timeDayFormData.start
              ? timeDayFormData.start?.toISOString()
              : null,
            end: timeDayFormData.end
              ? timeDayFormData.end?.toISOString()
              : null,
            allDay: timeDayFormData.allDay,
            publishedAt: new Date().toISOString(),
          },
        },
      });
    }
  };

  /** TimeEvent **/
  /* form */
  const [eventTitle, setEventTitle] = useState<string>("Événement n°1");
  const [eventDescription, setEventDescription] = useState<string>(
    "Ceci est un événement.",
  );
  const [eventStartDate, setEventStartDate] = useState<Date | null>(null);
  const [eventEndDate, setEventEndDate] = useState<Date | null>(null);
  const [timeEventFormData, setTimeEventFormData] =
    React.useState<ITimeEvent>();
  useEffect(() => {
    setTimeEventFormData({
      title: eventTitle,
      description: eventDescription,
      allDay: false,
      start: eventStartDate,
      end: eventEndDate,
    });
  }, [eventTitle, eventDescription, eventStartDate, eventEndDate]);

  /* mutation */
  const [createTimeEventFunction, { data: createTimeEventData }] =
    useMutation(CreateTimeEvent);
  useEffect(() => {
    console.log(JSON.stringify(createTimeEventData, null, 2));
  }, [createTimeEventData]);
  const handleTimeEventFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (timeEventFormData && !!Object.keys(timeEventFormData).length) {
      await createTimeEventFunction({
        variables: {
          data: {
            title: timeEventFormData.title,
            description: timeEventFormData.description,
            start: timeEventFormData.start
              ? timeEventFormData.start?.toISOString()
              : null,
            end: timeEventFormData.end
              ? timeEventFormData.end?.toISOString()
              : null,
            allDay: timeEventFormData.allDay,
            publishedAt: new Date().toISOString(),
          },
        },
      });
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className={"o-Page__Content"}>
          <h1> Dates </h1>
          <div className={"o-Page__Form"}>
            <h2>Nouveau Créneau RDV</h2>
            <form onSubmit={(e) => handleTimeSlotFormSubmit(e)}>
              <div className={"o-Page__Block"}>
                <label>
                  <div>Titre</div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={slotTitle}
                    onChange={(e) => setSlotTitle(e.target.value)}
                  />
                </label>
                <label>
                  <div>Description</div>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={slotDescription}
                    onChange={(e) => setSlotDescription(e.target.value)}
                  />
                </label>
              </div>
              <div className={"o-Page__Block"}>
                <label>
                  <div>Date Début</div>
                  <div style={{ display: "flex" }}>
                    <DatePicker
                      selected={slotStartDate}
                      onChange={(update) => setSlotStartDate(update)}
                      dateFormat="dd/MM/yyyy, hh:mm"
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="Horaire"
                      locale="fr"
                      isClearable={true}
                      popperModifiers={[
                        {
                          name: "arrow",
                          options: {
                            padding: ({ popper, reference }) => ({
                              right:
                                Math.min(popper.width, reference.width) - 24,
                            }),
                          },
                        },
                      ]}
                    />
                  </div>
                </label>
                <label>
                  <div>Date Fin</div>
                  <DatePicker
                    selected={slotEndDate}
                    onChange={(update) => setSlotEndDate(update)}
                    dateFormat="dd/MM/yyyy, hh:mm"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Horaire"
                    locale="fr"
                    isClearable={true}
                    popperModifiers={[
                      {
                        name: "arrow",
                        options: {
                          padding: ({ popper, reference }) => ({
                            right: Math.min(popper.width, reference.width) - 24,
                          }),
                        },
                      },
                    ]}
                  />
                </label>
              </div>
              <button type="submit" className={"o-Page__Save"}>
                Ajouter
              </button>
            </form>
          </div>
          <div className={"o-Page__Form"}>
            <h2>Nouveau Jour de Collecte</h2>
            <form onSubmit={(e) => handleTimeDayFormSubmit(e)}>
              <div className={"o-Page__Block"}>
                <label>
                  <div>Titre</div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={dayTitle}
                    onChange={(e) => setDayTitle(e.target.value)}
                  />
                </label>
                <label>
                  <div>Description</div>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={dayDescription}
                    onChange={(e) => setDayDescription(e.target.value)}
                  />
                </label>
              </div>
              <div className={"o-Page__Block"}>
                <label>
                  <div>Date Début</div>
                  <div style={{ display: "flex" }}>
                    <DatePicker
                      selected={dayStartDate}
                      onChange={(update) => setDayStartDate(update)}
                      dateFormat="dd/MM/yyyy, hh:mm"
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="Horaire"
                      locale="fr"
                      isClearable={true}
                      popperModifiers={[
                        {
                          name: "arrow",
                          options: {
                            padding: ({ popper, reference }) => ({
                              right:
                                Math.min(popper.width, reference.width) - 24,
                            }),
                          },
                        },
                      ]}
                    />
                  </div>
                </label>
                <label>
                  <div>Date Fin</div>
                  <DatePicker
                    selected={dayEndDate}
                    onChange={(update) => setDayEndDate(update)}
                    dateFormat="dd/MM/yyyy, hh:mm"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Horaire"
                    locale="fr"
                    isClearable={true}
                    popperModifiers={[
                      {
                        name: "arrow",
                        options: {
                          padding: ({ popper, reference }) => ({
                            right: Math.min(popper.width, reference.width) - 24,
                          }),
                        },
                      },
                    ]}
                  />
                </label>
              </div>
              <button type="submit" className={"o-Page__Save"}>
                Ajouter
              </button>
            </form>
          </div>
          <div className={"o-Page__Form"}>
            <h2>Nouvel Événement</h2>
            <form onSubmit={(e) => handleTimeEventFormSubmit(e)}>
              <div className={"o-Page__Block"}>
                <label>
                  <div>Titre</div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                </label>
                <label>
                  <div>Description</div>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                </label>
              </div>
              <div className={"o-Page__Block"}>
                <label>
                  <div>Date Début</div>
                  <div style={{ display: "flex" }}>
                    <DatePicker
                      selected={eventStartDate}
                      onChange={(update) => setEventStartDate(update)}
                      dateFormat="dd/MM/yyyy, hh:mm"
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="Horaire"
                      locale="fr"
                      isClearable={true}
                      popperModifiers={[
                        {
                          name: "arrow",
                          options: {
                            padding: ({ popper, reference }) => ({
                              right:
                                Math.min(popper.width, reference.width) - 24,
                            }),
                          },
                        },
                      ]}
                    />
                  </div>
                </label>
                <label>
                  <div>Date Fin</div>
                  <DatePicker
                    selected={eventEndDate}
                    onChange={(update) => setEventEndDate(update)}
                    dateFormat="dd/MM/yyyy, hh:mm"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Horaire"
                    locale="fr"
                    isClearable={true}
                    popperModifiers={[
                      {
                        name: "arrow",
                        options: {
                          padding: ({ popper, reference }) => ({
                            right: Math.min(popper.width, reference.width) - 24,
                          }),
                        },
                      },
                    ]}
                  />
                </label>
              </div>
              <div className={"o-Page__Block"}>
                <button type="submit" className={" o-Page__Save"}>
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

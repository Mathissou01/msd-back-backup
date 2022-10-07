import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { fetchAPI, fetchGraphQL } from "../lib/api";
import Header from "../components/header";
import styles from "../styles/page.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";

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

export default function DateAdd() {
  /* TimeSlot */
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

  const handleTimeSlotFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (timeSlotFormData && !!Object.keys(timeSlotFormData).length) {
      const createTimeSlot = await fetchGraphQL({
        query: `mutation createTimeSlot{
          createTimeSlot(data: {
            title: "${timeSlotFormData.title}",
            description: "${timeSlotFormData.description}",
            start: ${
              timeSlotFormData.start
                ? '"' + timeSlotFormData.start?.toISOString() + '"'
                : null
            },
            end: ${
              timeSlotFormData.end
                ? '"' + timeSlotFormData.end?.toISOString() + '"'
                : null
            },
            allDay: ${timeSlotFormData.allDay},
            publishedAt: "${new Date().toISOString()}"
          }) {
            data {
              id
              attributes {
                title
                description
                start
                end
                allDay
                createdAt
                publishedAt
              }
            }
          }
        }`,
      });
      console.log("get = ", JSON.stringify(createTimeSlot?.data, null, 2));
    }
  };

  /* TimeDay */
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

  const handleTimeDayFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (timeDayFormData && !!Object.keys(timeDayFormData).length) {
      const createTimeDay = await fetchGraphQL({
        query: `mutation createTimeDay{
          createTimeDay(data: {
            title: "${timeDayFormData.title}",
            description: "${timeDayFormData.description}",
            start: ${
              timeDayFormData.start
                ? '"' + timeDayFormData.start?.toISOString() + '"'
                : null
            },
            end: ${
              timeDayFormData.end
                ? '"' + timeDayFormData.end?.toISOString() + '"'
                : null
            },
            allDay: ${timeDayFormData.allDay},
            publishedAt: "${new Date().toISOString()}"
          }) {
            data {
              id
              attributes {
                title
                description
                start
                end
                allDay
                createdAt
                publishedAt
              }
            }
          }
        }`,
      });
      console.log("get = ", JSON.stringify(createTimeDay?.data, null, 2));
    }
  };

  /* TimeEvent */
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

  const handleTimeEventFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (timeEventFormData && !!Object.keys(timeEventFormData).length) {
      const createTimeEvent = await fetchGraphQL({
        query: `mutation createTimeEvent {
          createTimeEvent(data: {
            title: "${timeEventFormData.title}",
            description: "${timeEventFormData.description}",
            start: ${
              timeEventFormData.start
                ? '"' + timeEventFormData.start?.toISOString() + '"'
                : null
            },
            end: ${
              timeEventFormData.end
                ? '"' + timeEventFormData.end?.toISOString() + '"'
                : null
            },
            allDay: ${timeEventFormData.allDay},
            publishedAt: "${new Date().toISOString()}"
          }) {
            data {
              id
              attributes {
                title
                description
                start
                end
                allDay
                createdAt
                publishedAt
              }
            }
          }
        }`,
      });
      console.log("get = ", JSON.stringify(createTimeEvent?.data, null, 2));
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className={styles.page__content}>
          <h1>Dates</h1>
          <div className={styles.page__form}>
            <h2>Nouveau Créneau RDV</h2>
            <form onSubmit={(e) => handleTimeSlotFormSubmit(e)}>
              <div className={styles.page__block}>
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
              <div className={styles.page__block}>
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
              <button type="submit" className={styles.page__save}>
                Ajouter
              </button>
            </form>
          </div>
          <div className={styles.page__form}>
            <h2>Nouveau Jour de Collecte</h2>
            <form onSubmit={(e) => handleTimeDayFormSubmit(e)}>
              <div className={styles.page__block}>
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
              <div className={styles.page__block}>
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
              <button type="submit" className={styles.page__save}>
                Ajouter
              </button>
            </form>
          </div>
          <div className={styles.page__form}>
            <h2>Nouvel Événement</h2>
            <form onSubmit={(e) => handleTimeEventFormSubmit(e)}>
              <div className={styles.page__block}>
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
              <div className={styles.page__block}>
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
              <div className={styles.page__block}>
                <button type="submit" className={styles.page__save}>
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

export const getServerSideProps: GetServerSideProps = async () => {
  const pagesData = await fetchAPI("/pages");
  return {
    props: { pages: pagesData.data },
  };
};

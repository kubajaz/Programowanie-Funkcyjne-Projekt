"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";

const tournaments = [
    { name: "Spring Blitz Challenge", date: "April 27" },
    { name: "Kids Rapid Cup", date: "May 12" },
    { name: "Chess960 Open", date: "June 3" },
];

export const Info = () => {
    const [activeTournament, setActiveTournament] = useState<string | null>(null);

    return (
        <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-neutral-200 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
                <Image src="/knight.svg" alt="Info" width={26} height={26} />
                <h2 className="text-2xl font-bold text-neutral-800">Chess Club Info</h2>
            </div>

            <section className="space-y-2 mb-6">
                <h3 className="text-lg font-semibold text-neutral-700">📞 Contact</h3>
                <p className="text-neutral-600">Email: <span className="font-medium">klubcaissa@gmail.com</span></p>
                <p className="text-neutral-600">Phone: <span className="font-medium">+48 123 456 789</span></p>
                <p className="text-neutral-600">Location: <span className="font-medium">Warsaw, Domaniewska 47</span></p>
            </section>

            <section className="space-y-2 mb-6">
                <h3 className="text-lg font-semibold text-neutral-700">📅 Class Schedule</h3>
                <ul className="text-neutral-600 list-disc list-inside space-y-1">
                    <li>Monday 17:00 - Beginners</li>
                    <li>Wednesday 18:30 - Intermediate</li>
                    <li>Friday 17:00 - Advanced & Sparring</li>
                </ul>
            </section>

            <section className="space-y-2">
                <h3 className="text-lg font-semibold text-neutral-700">🏆 Upcoming Tournaments</h3>
                <ul className="space-y-3">
                    {tournaments.map((tournament) => (
                        <li key={tournament.name} className="flex justify-between items-center bg-neutral-50 p-4 rounded-xl shadow-sm border">
                            <div>
                                <p className="text-neutral-700 font-semibold">{tournament.name}</p>
                                <p className="text-sm text-neutral-500">{tournament.date}</p>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => setActiveTournament(tournament.name)}
                                    >
                                        Sign up
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg border border-neutral-200">
                                    <DialogHeader>
                                        <DialogTitle className="text-lg font-bold">
                                            Sign up for {activeTournament}
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 mt-4">
                                        <p className="text-neutral-600 text-sm">
                                            Fill in your contact details and we'll reserve a spot for you in the tournament!
                                        </p>
                                        <form className="flex flex-col gap-3">
                                            <input
                                                type="text"
                                                placeholder="Your name"
                                                className="border p-2 rounded-lg text-sm"
                                            />
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="border p-2 rounded-lg text-sm"
                                            />
                                            <Button type="submit" className="w-full">
                                                Submit
                                            </Button>
                                        </form>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

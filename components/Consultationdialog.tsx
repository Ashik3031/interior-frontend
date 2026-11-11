"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Props = { open: boolean; onClose: () => void };

const inputCls =
    "mt-1 w-full border border-current bg-transparent p-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass";

export default function ConsultationDialog({ open, onClose }: Props) {
    const ref = useRef<HTMLDialogElement>(null);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        const d = ref.current;
        if (!d) return;
        if (open && !d.open) {
            setSent(false);
            d.showModal();
        }
        if (!open && d.open) d.close();
    }, [open]);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        // TODO: send `data` to your API route, CRM or WhatsApp endpoint
        // await fetch("/api/consultation", { method: "POST", body: JSON.stringify(data) });
        console.log(data);
        setSent(true);
    }

    return (
        <dialog
            ref={ref}
            onClose={onClose}
            onClick={(e) => e.target === e.currentTarget && onClose()}
            className="m-auto w-[92vw] max-w-105 bg-white p-0 text-ink backdrop:bg-ink/60 dark:bg-[#16373b] dark:text-[#eef1ec]"
        >
            <div className="p-8">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="float-right text-2xl leading-none focus-visible:outline-2 focus-visible:outline-brass"
                >
                    &times;
                </button>

                {sent ? (
                    <p className="py-8">
                        <b>Thank you.</b>
                        <br />
                        We have your request and will call you within one business day.
                    </p>
                ) : (
                    <form onSubmit={onSubmit} className="text-[13px] font-semibold">
                        <h3 className="mb-1.5 font-display text-[28px] font-normal">
                            Book a free consultation
                        </h3>
                        <p className="text-sm font-normal">
                            Leave your details and we will call you within one business day.
                        </p>
                        <label className="mt-3.5 block">
                            Name
                            <input name="name" required autoComplete="name" className={inputCls} />
                        </label>
                        <label className="mt-3.5 block">
                            Phone or WhatsApp
                            <input name="phone" type="tel" required autoComplete="tel" className={inputCls} />
                        </label>
                        <label className="mt-3.5 block">
                            Email
                            <input name="email" type="email" required autoComplete="email" className={inputCls} />
                        </label>
                        <label className="mt-3.5 block">
                            Project
                            <select name="project" className={inputCls}>
                                <option>Villa</option>
                                <option>Apartment</option>
                                <option>Penthouse</option>
                                <option>Office or retail</option>
                            </select>
                        </label>
                        <button
                            type="submit"
                            className="mt-5 bg-brass px-4.5 py-3 text-[13px] font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                        >
                            Request my consultation
                        </button>
                    </form>
                )}
            </div>
        </dialog>
    );
}
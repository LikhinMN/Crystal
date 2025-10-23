"use client"
import {faqs} from "@/constants";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import React from "react";
export default function FAQ () {
    return <section
        id = "faq"
        className = "py-24 px-6 bg-muted/30">
        <div className = "max-w-3xl mx-auto">
            <div className = "text-center mb-16 space-y-4">
                <h2 className = "text-3xl md:text-4xl lg:text-5xl font-bold">Frequently Asked Questions</h2>
            </div>

            <Accordion
                type = "single"
                collapsible
                className = "space-y-4">
                {faqs.map(( faq, i ) => (<AccordionItem
                    key = {i}
                    value = {`item-${i}`}
                    className = "border border-border rounded-lg px-6">
                    <AccordionTrigger className = "text-base font-semibold hover:no-underline py-5">
                        {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className = "text-sm text-muted-foreground pb-5 leading-relaxed">
                        {faq.a}
                    </AccordionContent>
                </AccordionItem>))}
            </Accordion>
        </div>
    </section>
}
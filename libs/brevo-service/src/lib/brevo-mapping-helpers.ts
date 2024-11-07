import { defaultPrefixToLocalesMap } from '@westfield-rise/westfield-rise-contentful-client';
import { BrevoAttributes } from '../types/index';

const phoneNumberRegex = new RegExp('\\D', 'g'); // Double backslash needed for escape

function getServices(services: any) {
    const trueKeys: string[] = [];

    for (const item of services) {
        for (const [key, value] of Object.entries(item)) {
            if (value === true) {
                trueKeys.push(key);
            }
        }
    }

    return trueKeys.join(",");
}

function getPhoneValue(phone: string): string {
    let phone_number = '';

    phone_number = phone.replace(phoneNumberRegex, "");

    if (phone.startsWith("+")) {
        return `+${phone_number}`;
    }

    return phone_number;
}

export const getAttributes = (attributes: any) => {
    const attributesValue: BrevoAttributes = {};
    for (const [key, value] of Object.entries(attributes)) {
        if (key === "firstName")
            attributesValue.PRENOM = value as string;
        if (key === "lastName")
            attributesValue.NOM = value as string;
        if (key === "companyName")
            attributesValue.COMPANY_Name = value as string;
        if (key === "jobTitle")
            attributesValue.JOB_TITLE = value as string;
        if (key === "description")
            attributesValue.DESCRIPTION = value as string;
        if (key === "services")
            attributesValue.SERVICES = getServices(value) as string;
        if (key === "phone") {
            const phoneValue = getPhoneValue(value as string);
            if (phoneValue)
                attributesValue.SMS = phoneValue;
        }
    }
    return attributesValue;
}

export const getPrefixFromLocale = (locales: string[]): string | null => {
    for (const [prefix, supportedLocales] of Object.entries(defaultPrefixToLocalesMap)) {
        for (const locale of locales) {
            if (supportedLocales.includes(locale)) {
                return prefix.toUpperCase();
            }
        }
    }
    return "EN";
};
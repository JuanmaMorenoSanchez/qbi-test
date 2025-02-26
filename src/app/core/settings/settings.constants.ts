import { Settings } from "./settings.models";

export const defaultSettings: Settings = {
    selectedPageSize: 20,
    currency: 'EUR',
    productColumnSettings: [
        {
            name: 'name',
            visible: true
        },
        {
            name: 'product',
            visible: true
        },
        {
            name: 'department',
            visible: true
        },
        {
            name: 'description',
            visible: true
        },
        {
            name: 'price',
            visible: true
        },
        {
            name: 'id',
            visible: true
        }
    ],
    companyColumnSettings: [
        {
            name: 'name',
            visible: true
        },
        {
            name: 'suffix',
            visible: true
        },
        {
            name: 'catchPhrase',
            visible: true
        },
        {
            name: 'catchPhraseDescription',
            visible: true
        },
        {
            name: 'city',
            visible: true
        },
        {
            name: 'country',
            visible: true
        },
        {
            name: 'id',
            visible: true
        }
    ]
}


export interface commerceProductsInterface {
    active: boolean,
    assets: any[],
    categories: string[],
    checkout_url: {
        checkout: string,
        display: string,
    },
    collects: {
        fullname: boolean,
        shipping_address: boolean,
        billing_address: boolean,
        extrafields: boolean
    },
    conditionals: {
        is_active: boolean, 
        is_free: boolean, 
        is_tax_exempt: boolean, 
        is_pay_what_you_want: boolean, 
        is_quantity_limited: boolean
    },
    created: number,
    description: string,
    extrafields: any[],
    has: {
        digital_delivery: boolean, 
        physical_delivery: boolean, 
        images: boolean, 
        video: boolean, 
        rich_embed: boolean
    },
    id: string,
    is: {
        active: boolean, 
        free: boolean, 
        tax_exempt: boolean, 
        pay_what_you_want: boolean, 
        quantity_limited: boolean
    },
    media: any[],
    meta: null | any,
    name: string,
    permalink: string,
    price: {
        raw: number, 
        formatted: string, 
        formatted_with_symbol: string, 
        formatted_with_code: string
    },
    quantity: number,
    related_products: any[],
    seo: {
        title: null | any, 
        description: null | any
    },
    sku: string,
    sort_order: number,
    thank_you_url: null | any,
    updated: number,
    variants: any[],
    __proto__: any

}
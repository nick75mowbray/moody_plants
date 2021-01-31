type itemsType = {
    id:string,
        product_id:string,
        name:string,
        product_name:string,
        media:any[],
        sku:string,
        permalink:string,
        quantity:number,
        price: {
            raw:number,
            formatted:string,
            formatted_with_symbol:string,
            formatted_with_code:string
            },
        line_total: {
            raw:number,
            formatted:string,
            formatted_with_symbol:string,
            formatted_with_code:string
            },
        variants:any[]
}

export interface cartInterface {
    id:string,
    created:number,
    updated:number,
    expires:number,
    total_items:number,
    total_unique_items:number,
    subtotal: {
        raw:number,
        formatted:string,
        formatted_with_symbol:string,
        formatted_with_code:string
    },
    discount_code:any[],
    hosted_checkout_url:string,
    line_items: itemsType[],
    currency: {
        code:string,
        symbol:string
    }
}
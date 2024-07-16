// TikTok Pixel Code here

analytics.subscribe("product_viewed", (event) => {
    console.log("product_viewed", event);
    ttq.track("ViewContent", {
        contents: [
            {
                content_id: event.data?.productVariant?.id, // string. ID of the product. Example: "1077218".
                content_type: "product", // string. Either product or product_group.
                content_name: event.data?.productVariant?.title, // string. The name of the page or product. Example: "shirt".
            },
        ],
        value: event.data?.productVariant?.price.amount, // number. Value of the order or items sold. Example: 100.
        currency: event.data?.productVariant?.price.currencyCode, // string. The 4217 currency code. Example: "USD".
    });
});

analytics.subscribe("search_submitted", (event) => {
    ttq.track("Search", {
        query: event.searchResult.query, // string. The word or phrase used to search. Example: "SAVE10COUPON".
    });
});

analytics.subscribe("payment_info_submitted", (event) => {
    ttq.track("AddPaymentInfo");
});

analytics.subscribe("product_added_to_cart", (event) => {
    let content = {
        content_id: event.data?.cartLine?.merchandise?.id,
        content_type: "product",
        content_name: event.data?.cartLine?.merchandise?.title,
    };
    console.log("product_added_to_cart", event, content);
    ttq.track("AddToCart", {
        contents: [content],
        value: event.data?.cartLine?.merchandise?.price.amount, // number. Value of the order or items sold. Example: 100.
        currency: event.data?.cartLine?.merchandise?.price?.currencyCode, // string. The 4217 currency code. Example: "USD".
    });
});

analytics.subscribe("checkout_started", (event) => {
    let contents = [];
    for (let item of event.data.checkout.lineItems) {
        contents.push({
            content_id: item.id,
            content_name: item.title,
            content_type: "product",
        });
    }
    console.log("checkout_started", event);
    ttq.track("InitiateCheckout", {
        contents: contents,
        value: event.data.checkout.totalPrice.amount,
        currency: event.data.checkout.totalPrice.currencyCode,
    });
});

analytics.subscribe("checkout_completed", (event) => {
    let contents = [];
    for (let item of event.data.checkout.lineItems) {
        contents.push({
            content_id: item.id,
            content_name: item.title,
            content_type: "product",
        });
    }
    console.log("checkout_completed", event);
    ttq.track("PlaceAnOrder", {
        contents: contents,
        value: event.data?.checkout?.totalPrice?.amount, // number. Value of the order or items sold. Example: 100.
        currency: event.data?.checkout?.currencyCode, // string. The 4217 currency code. Example: "USD".
    });
    ttq.track("CompletePayment", {
        contents: contents,
        value: event.data?.checkout?.totalPrice?.amount, // number. Value of the order or items sold. Example: 100.
        currency: event.data?.checkout?.currencyCode, // string. The 4217 currency code. Example: "USD".
    });
});

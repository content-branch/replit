import { fetchContentfulEnvironments } from "../../contentful-environment";
import {  ContentfulClientApi } from 'contentful';

let contentfulDeliveryClient: ContentfulClientApi;

export async function refreshAllClients(preview = false) {
    const clients = await fetchContentfulEnvironments(preview);
    contentfulDeliveryClient = clients.contentfulDeliveryClient;
}

export { contentfulDeliveryClient };

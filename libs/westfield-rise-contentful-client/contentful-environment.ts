import { createClient, ContentfulClientApi } from 'contentful';

const existingClients: { [key: string]: ContentfulClientApi } = {};

const getClientKey = (
  spaceId: string | undefined,
  environment: string | undefined,
  preview: boolean) => {

    return `${spaceId}${environment}${preview}`;
}

// Helper function to get environment
async function getClient(
  accessToken: string | undefined,
  spaceId: string | undefined,
  environment: string | undefined,
  preview: boolean

): Promise<ContentfulClientApi> {
  accessToken = accessToken || '';
  spaceId = spaceId || '';

const clientKey = getClientKey(spaceId,environment,preview)

  // cache the clients
  if (existingClients[clientKey]) {
    return existingClients[clientKey];
  }
  
  const config = {
    accessToken: accessToken,
    space: spaceId,
    environment: environment,
    host: preview ? 'preview.contentful.com' : undefined
  };

  console.log(config);

  const client = createClient(config);

  existingClients[clientKey] = client;

  return client;
}

export async function fetchContentfulEnvironments(preview:boolean) {
  try {
    //@ts-ignore
    const contentfulSpaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    //@ts-ignore
    const contentfulDeliveryAPIKey = preview ? (process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_API_KEY ?? process.env.CONTENTFUL_PREVIEW_API_KEY)  : process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_API_KEY ?? process.env.CONTENTFUL_DELIVERY_API_KEY;

    //@ts-ignore
    const contentfulEnvironment = process.env.CONTENTFUL_ENVIRONMENT ?? process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT;

    const contentfulDeliveryClient = await getClient(
      contentfulDeliveryAPIKey,
      contentfulSpaceId,
      contentfulEnvironment,
      preview
    );

    return {
      contentfulDeliveryClient,
    };
  } catch (error) {
    console.error('Error fetching Contentful environment:', error);
    throw error;
  }
}

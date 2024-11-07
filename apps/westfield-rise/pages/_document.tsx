import Document, {
    DocumentContext,
    DocumentInitialProps,
    Html,
    Head,
    Main,
    NextScript,
    
} from "next/document";
import getConfig from 'next/config';
import Script from "next/script";

class MyDocument extends Document {

    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);
      
        return {
            ...initialProps            
        };
    }

    render() {
         // Get the runtime config
         const { publicRuntimeConfig } = getConfig();
        
         // Extract the environment variable
         const shouldLoadPreProd = publicRuntimeConfig.ENV_TYPE === 'preprod' ? 'true' : 'false';
         
        console.log(publicRuntimeConfig.ENV_TYPE);
        return (
            <Html>
                <Head>

                    <Script
                        src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
                        type="text/javascript"
                        charSet="UTF-8"

                        data-domain-script="936200d5-94c8-4a05-96b8-987ffad64ff2"

                        strategy="beforeInteractive"
                    ></Script>
                    <Script
                        id="oneTrustScript"
                        type="text/javascript"
                        strategy="beforeInteractive"
                    >
                        {`(function OptanonWrapper() { })`}
                    </Script>
                    <Script
                        id="google-tag-manager"
                        strategy="beforeInteractive"
                    >
                        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-P4FWVG3K');`}
                    </Script>
                        
                    {shouldLoadPreProd === 'true' ? (<script async type="text/javascript" src="/js/newRelicPreProd.js"/>) : (<script async type="text/javascript" src="/js/newRelicProd.js"/>)}
                </Head>
                <body>
                <noscript
                    dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P4FWVG3K" height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}>
                </noscript>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
const HTMX_FRAGMENT_ROUTES = ["/prompt"];

export const onRequest = async (context, next) => {
  const response = await next();
  let html = await response.text();

  if (
    HTMX_FRAGMENT_ROUTES.find((route) => context.request.url.includes(route))
  ) {
    // Delete the CSS and JS from the HTML response
    html = html.replace(/<style type\=\"text\/css\"(.*)<\/style>/s, "");
    html = html.replace(/<script(.*)<\/script>/gm, "");
  }

  return new Response(html, {
    status: 200,
    headers: response.headers,
  });
};
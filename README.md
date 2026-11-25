# PulseBoard — CloudFront Demo Application

A responsive static analytics dashboard built with HTML, CSS, and vanilla JavaScript.

## Run locally
Open `index.html` in a browser, or run a simple local server from this folder:
```bash
python -m http.server 8000
```
Then visit http://localhost:8000.

## Deploy to Amazon S3 + CloudFront
1. Create an S3 bucket. Keep **Block all public access** enabled.
2. Upload `index.html`, `css/`, and `js/` while preserving the folder structure.
3. Create a CloudFront distribution with the S3 bucket as its origin.
4. Create an Origin Access Control (OAC), attach it to the distribution, and update the bucket policy using the policy CloudFront provides. Do not make the bucket public.
5. Set the default root object to `index.html`.
6. Wait for the distribution status to become Deployed, then open its CloudFront domain name.
7. Change a visible heading in `index.html`, upload the changed file, and reload the CloudFront URL to observe caching.
8. Create an invalidation for `/index.html` (or `/*` for all assets) to force CloudFront to fetch the updated object from S3.

## Suggested cache experiment
- Set a short cache policy TTL for HTML (for example, 0–60 seconds while learning).
- Use a longer TTL for versioned static assets such as CSS and JS in a production setup.
- Open browser DevTools → Network, reload the page, and inspect response headers such as `x-cache`, `age`, and `via` where present.
- Compare the response before and after invalidation. A cache hit may appear as `X-Cache: Hit from cloudfront`; the first request or a miss may show `Miss from cloudfront`.

## Notes
- The dashboard uses demo data; it does not connect to a backend or collect visitor analytics.
- Google Fonts is loaded from an external host. For a fully self-contained test, remove the `@import` line in `css/styles.css` and the browser will use the fallback fonts.

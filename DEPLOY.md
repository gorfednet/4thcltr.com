# Deploy and SSL

## Deploy script

- **`deploy-to-smb.sh`** (run via `make deploy`) only syncs `dist/` to the SMB share. On the server the tree is often `/data/websites/*`; on macOS the same share is typically mounted as `/Volumes/data/websites/4thcltr.com`. It does not configure the web server or SSL.

## SSL on the server

SSL is configured on the server via nginx, not by this repo.

1. **Nginx vhost**  
   Copy `nginx/4thcltr.com.conf` to the server (e.g. `/etc/nginx/vhosts.d/4thcltr.com.conf`). The vhost **`root`** is set to **`/data/websites/4thcltr.com`** so it matches the usual SMB/rsync target.

2. **HTTP 301**  
   Port 80 returns **301 → HTTPS**.

3. **Certificate**  
   If using Let's Encrypt:
   ```bash
   certbot certonly --nginx -d 4thcltr.com -d www.4thcltr.com
   ```

4. **Reload**  
   After adding or changing the vhost and obtaining the cert:
   ```bash
   nginx -t && systemctl reload nginx
   ```

## SPA routing

This site is a Vite SPA with React Router (`/` and `/manifesto`). The reference vhost uses `@spa_fallback` → `/index.html` so deep links work on refresh. Do not use bare `try_files … /index.html` together with a `location = /index.html { return 301 /; }` without the named location — that can 500-loop the root.

Also ensure the docroot is world-readable by the nginx user:

```bash
chmod -R a+rX /data/websites/4thcltr.com
```

## Reference vhosts

Same server, different vhosts (for comparison):

- **gorfmusic.com** — `/Volumes/data/websites/gorfmusic.com`
- **gorfed.net** — `/Volumes/data/websites/gorfed.net`

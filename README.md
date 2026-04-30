# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Deploy on your own hosting (VPS + Nginx)

This project is a Vite static frontend, so production deploy is simple: build files and serve `dist` via Nginx.

### 1) Server requirements

- Ubuntu 22.04+ (or similar Linux distro)
- Node.js 20+ and npm
- Nginx
- Domain pointed to your server IP (optional, but recommended)

### 2) Install dependencies on server

```sh
sudo apt update
sudo apt install -y nginx curl git
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### 3) Clone and build project

```sh
git clone <YOUR_GIT_URL> /var/www/tektonika
cd /var/www/tektonika
npm i
npm run build
```

After build, static files will be available in `dist/`.

### 4) Configure Nginx

Create config file:

```sh
sudo nano /etc/nginx/sites-available/tektonika
```

Paste:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;

    root /var/www/tektonika/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

Enable and reload Nginx:

```sh
sudo ln -s /etc/nginx/sites-available/tektonika /etc/nginx/sites-enabled/tektonika
sudo nginx -t
sudo systemctl reload nginx
```

Now the app should open by your domain or server IP.

### 5) Enable HTTPS (recommended)

```sh
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 6) How to update after new commits

```sh
cd /var/www/tektonika
git pull
npm i
npm run build
sudo systemctl reload nginx
```

### Troubleshooting

- Blank page: run `npm run build` and check that `/var/www/tektonika/dist/index.html` exists.
- 404 on refresh: ensure `try_files $uri $uri/ /index.html;` is in Nginx config.
- Assets not updating: hard refresh browser cache (`Ctrl+F5`) or reduce cache headers while debugging.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

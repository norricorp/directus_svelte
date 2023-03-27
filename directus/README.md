# Directus Example

This is a [Directus](https://directus.io) project bootstrapped with [`create-directus-project`](https://github.com/directus/directus/tree/main/packages/create-directus-project).

Admin credentials for this Directus instance:

- **Email** — `admin@example.com`
- **Password** — `d1r3ctu5`
  
## 📌 Prerequisites

- [Node.js](https://nodejs.dev) v12.20 and above

## 🚀 Getting Started

1. Clone this repo.

2. Install dependencies for this example Directus project.

   ```shell
   cd directus
   npm install
   ```

3. Start the project locally.

   ```shell
   npx directus start
   ```

   Your Directus example is now running at <http://localhost:8055>.

4. You can login with the admin credentials shown above to explore this Directus example project.

## 🔗 Links

- [Official Site](https://directus.io)
- [Documentation](https://docs.directus.io)


Caddy setup
/etc/caddy/Caddyfile

        log default {
                output file /var/log/caddy/wolfsberg.json
                format json
                include http.log.access admin.api
        }
}

# The Caddyfile is an easy way to configure your Caddy web server.
#
# Unless the file starts with a global options block, the first
# uncommented line is always the address of your site.
#
# To use your own domain name (with automatic HTTPS), first make
# sure your domain's A/AAAA DNS records are properly pointed to
# this machine's public IP, then replace ":80" below with your
# domain name.

mint21-wolfsberg:8555 {
	# Set this path to your site's directory.
	# root * /opt/wolfsberg/directus

	# Enable the static file server.
	# file_server

	# Another common task is to set up a reverse proxy:
	reverse_proxy localhost:8055
	tls internal

	# Or serve a PHP site through php-fpm:
	# php_fastcgi localhost:9000
}



sudo systemctl start caddy
sudo systemctl stop caddy
sudo systemctl reload caddy
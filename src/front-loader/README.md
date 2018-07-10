# Front-loader
This microservice provides the user-facing endpoint for the API and the static site. As such, this also acts as a load balancer.

To add a new micro service follow the following format:

Under `location /api/v1 {` add
```
    #
    # < Service Name >
    #
    location /api/v1/<Endpoint> {
        proxy_pass http://<Url:Port>/<Endpoint>;
    }
```

See the example below for 'getskits':
```
    #
    # Skit-Core
    #
    location /api/v1/getskits {
        proxy_pass http://skits:7000/getskits;
    }
```

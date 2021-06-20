include_player_ids=ef429bf7-4c92-479d-9adb-124dedd9fe17
app_id=35b32daa-9c97-4cce-acfc-0b1f9cda63dc
authen=ODI1NGNiMTYtMzkxMS00ZjQ0LTk0ODYtZjNkNGZjYTM4NjA3
curl --include \ --request POST \
     --header "Content-Type: application/json; charset=utf-8" \
     --header "Authorization: Basic ${authen}" \
     --data-binary "{\"app_id\": \"${app_id}\",
\"contents\": {\"en\": \"English Message\"},
\"apns_push_type_override\": \"voip\",
\"priority\": 10,
\"include_player_ids\": [\"${include_player_ids}\"]}" \
     https://onesignal.com/api/v1/notifications

#android
# curl --include \ --request POST \
#      --header "Content-Type: application/json; charset=utf-8" \
#      --header "Authorization: Basic MmIzNmFhN2YtYTQ0OS00MjU3LWI1OWEtYjYyMzM1YzI1YzVk" \
#      --data-binary "{\"app_id\": \"2d570ac9-12f2-4f89-86ca-d4c99981da6a\",
# \"contents\": {\"en\": \"English Message\"},
# \"priority\": 10,
# \"include_player_ids\": [\"461b406d-b79e-4575-8e2d-0820956bf43e\"]}" \
#      https://onesignal.com/api/v1/notifications

# curl --include \ --request POST \
#      --header "Content-Type: application/json; charset=utf-8" \
#      --header "Authorization: Basic ODI1NGNiMTYtMzkxMS00ZjQ0LTk0ODYtZjNkNGZjYTM4NjA3" \
#      --data-binary "{\"app_id\": \"5413e853-fa21-4871-a753-f02abf21d150\",
# \"contents\": {\"en\": \"English Message\"},
# \"apns_push_type_override\": \"voip\",
# \"priority\": 10,
# \"include_player_ids\": [\"ba859cd8-4a12-4b84-9ea7-26476ede834b\"]}" \
#      https://onesignal.com/api/v1/notifications

# HTTP/2 200 
# date: Mon, 04 Jan 2021 03:21:24 GMT
# content-type: application/json; charset=utf-8
# set-cookie: __cfduid=d2573d5cfd804b6aef8b656dbee25a8091609730483; expires=Wed, 03-Feb-21 03:21:23 GMT; path=/; domain=.onesignal.com; HttpOnly; SameSite=Lax
# status: 200 OK
# cache-control: max-age=0, private, must-revalidate
# access-control-allow-origin: *
# referrer-policy: strict-origin-when-cross-origin
# x-xss-protection: 1; mode=block
# x-request-id: eae92b21-ce8d-492b-a33e-a2285e07d7a6
# access-control-allow-headers: SDK-Version
# etag: W/"82aa2ac4f2f5625a577bfd0725d03f88"
# x-frame-options: SAMEORIGIN
# x-runtime: 0.053720
# x-content-type-options: nosniff
# x-powered-by: Phusion Passenger 6.0.4
# cf-cache-status: DYNAMIC
# cf-request-id: 076d02feaf00000baa1d24b000000001
# expect-ct: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
# server: cloudflare
# cf-ray: 60c1d4444c390baa-HKG

# {"id":"cecd0f0d-776b-4cee-b189-f2f42a91ae7d","recipients":1,"external_id":null}%  
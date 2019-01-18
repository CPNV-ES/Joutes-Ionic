# Api Requirements

in `src/app/app.const.ts`, you can specify the requirements of the joutes API, the version and the key of JSON.
The version number must be the same of the current /api version key.

Example :
joutes.mycpnv.ch/api
```json
{
    "name":"Joutes CPNV",
    "version":"2.2.0",
    "api_routes":{
        "events.index":"\/api\/events",
        "events.show":"\/api\/events\/{event}",
        "events.tournaments.index":"\/api\/events\/{event}\/tournaments",
        "events.tournaments.show":"\/api\/events\/{event}\/tournaments\/{tournament}",
        "events.tournaments.pools.index":"\/api\/events\/{event}\/tournaments\/{tournament}\/pools",
        "events.tournaments.pools.show":"\/api\/events\/{event}\/tournaments\/{tournament}\/pools\/{pool}",
        "events.teams.index":"\/api\/events\/{event}\/teams",
        "events.teams.show":"\/api\/events\/{event}\/teams\/{team}",
        "events.participants.index":"\/api\/events\/{event}\/participants",
        "events.participants.show":"\/api\/events\/{event}\/participants\/{participant}",
        "participants.notifications.index":"\/api\/participants\/{participant}\/notifications",
        "notifications.update":"\/api\/notifications\/{notification}",
        "tournaments.schedule.index":"\/api\/tournaments\/{tournament}\/schedule",
        "profil.index":"\/api\/profil",
        "login.index":"\/api\/login",
        "login.store":"\/api\/login",
        "login.show":"\/api\/login\/{login}",
        "login.update":"\/api\/login\/{login}",
        "login.destroy":"\/api\/login\/{login}",
        "index":"\/api"
    }
}
```

app.const.ts
```Javascript
export const GLOBAL = {
    apiVersion : '2.2.0',
    apiRequirements: ['name','version','api_routes']
}
```

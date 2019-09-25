programmatic(`
    <%- for (const entry of entries) { %>
    <%= '%3d hello', entry.pid %> <%= entry.command %>
    <%- } %>
`, { entries })

programmatic(`
    <%- for (var i = 0; i < I; i++) { %>
        <%=
    <%- } %>
    <%- for (const entry of entries) { %>
    <%=(%d) entry.pid %> <%= entry.command %>
    <%- } %>
    }
`, { entries })

/*
    ___ $ ___
    missing:
        hello
            %for (const entry of entries)
                %[ 'you forgot your %d' : entries.thing ]

    required:
        %[ argument ] is required

    tabular:
        %table (entries)
            %[ 'PID' ] %[ 'COMMAND' ] %[ 'VSS' ]
        %# this is a comment
        %# this is as good as table.
        %for (const p of processes)
            %[ ~ > '%d' : p.pid ] %[ ... : p.command ] %[ - : vss ]
        %while (items.length != 0)
            hello %[ items.shift().name ]
        %loop
            hello %[ items.shift.name ]
            %if (items.length == 0) { break i }

    ___ . ___
 */

// Function to create and update clocks for African time zones
function createClocks() {
    const africanTimezones = ['Africa/Abidjan', 'Africa/Accra', 'Africa/Algiers', 'Africa/Bissau', 'Africa/Cairo', 'Africa/Casablanca', 'Africa/Ceuta', 'Africa/El_Aaiun', 'Africa/Freetown', 'Africa/Gaborone', 'Africa/Harare', 'Africa/Johannesburg', 'Africa/Juba', 'Africa/Khartoum', 'Africa/Kigali', 'Africa/Lagos', 'Africa/Libreville', 'Africa/Lome', 'Africa/Luanda', 'Africa/Lubumbashi', 'Africa/Lusaka', 'Africa/Malabo', 'Africa/Maputo', 'Africa/Maseru', 'Africa/Mbabane', 'Africa/Mogadishu', 'Africa/Monrovia', 'Africa/Nairobi', 'Africa/Ndjamena', 'Africa/Niamey', 'Africa/Nouakchott', 'Africa/Ouagadougou', 'Africa/Porto-Novo', 'Africa/Sao_Tome', 'Africa/Tripoli', 'Africa/Tunis', 'Africa/Windhoek'];

    const clocksContainer = $('#clocks-container');
    clocksContainer.empty();

    africanTimezones.forEach(function (timezone) {
        const clockDiv = $('<div class="clock">');
        clocksContainer.append(clockDiv);

        setInterval(function () {
            const now = moment().tz(timezone);
            const timeString = now.format('HH:mm:ss');
            clockDiv.text(`${timezone.split('/')[1]}: ${timeString}`);
        }, 1000);
    });
}

// Function to fetch and display Microsoft To-Do tasks
function fetchToDoList() {
    // Replace with your Microsoft To-Do API endpoint
    const todoEndpoint = 'https://graph.microsoft.com/v1.0/me/todo/lists';

    // Replace with your access token obtained after authentication
    const accessToken = 'YOUR_ACCESS_TOKEN';

    $.ajax({
        url: todoEndpoint,
        type: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        success: function (data) {
            const todoListContainer = $('#todo-list');
            todoListContainer.empty();

            if (data.value.length > 0) {
                data.value.forEach(function (task) {
                    const listItem = $('<li>').text(task.displayName);
                    todoListContainer.append(listItem);
                });
            } else {
                todoListContainer.text('Nessuna attività trovata.');
            }
        },
        error: function (error) {
            console.error('Errore nella chiamata API Microsoft To-Do:', error);
        }
    });
}

// Function to fetch and display RSS feed from jw.org
function fetchRSSFeed() {
    // Replace with your RSS feed URL
    const rssFeedUrl = 'https://www.jw.org/en/whats-new/rss/WhatsNewWebArticles/feed.xml';

    $.ajax({
        url: 'https://api.rss2json.com/v1/api.json',
        type: 'GET',
        data: {
            rss_url: rssFeedUrl
        },
        success: function (data) {
            const rssFeedContainer = $('#rss-feed');
            rssFeedContainer.empty();

            if (data.items.length > 0) {
                data.items.forEach(function (item) {
                    const rssItem = $('<div>');
                    rssItem.append($('<h3>').text(item.title));
                    rssItem.append($('<p>').html(item.description));
                    rssFeedContainer.append(rssItem);
                });
            } else {
                rssFeedContainer.text('Nessun elemento RSS trovato.');
            }
        },
        error: function (error) {
            console.error('Errore nella chiamata API RSS:', error);
        }
    });
}

// Execute functions when the document is ready
$(document).ready(function () {
    createClocks();
    fetchToDoList();
    fetchRSSFeed();
});

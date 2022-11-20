import React, {Component} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';



export default class EventCalendar extends Component {


    render(): React.ReactNode {
        return (
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
            initialView="dayGridMonth"
            weekends={false}
            selectable={true}
            dateClick={this.handleDateClick.bind(this)}
            height={600}
            headerToolbar={{
              start: "today prev,next",
              center: 'title',
              end: "dayGridMonth, timeGridWeek, timeGridDay, list",
            }}
          />
        );
    }
    handleDateClick = (Charly: any) => { // bind with an arrow function
        console.log(Charly.dateStr)
    }

}

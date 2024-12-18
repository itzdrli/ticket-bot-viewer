import {TimelineEvent} from "~/types/ITicketJSON";
import {For} from "solid-js"

function getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

export function TimeLineComponent(pros: TimelineEvent[]) {
    return (<ul class="timeline timeline-vertical"><For each={pros}>
        {(item, index) => (
            <li>
                <div class
                         ="timeline-start">{new Date(item.timestamp).toLocaleString('en-US', {
                            hour12: false,
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        }).replace(/(\d+)(?=(,|\s))/, (match) => `${match}${getDaySuffix(Number(match))}`)}
                </div>
                <div class
                         ="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class
                        ="w-5 h-5">
                        <path fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clip-rule="evenodd"/>
                    </svg>
                </div>
                <div class
                         ="timeline-end timeline-box">{item.label}
                </div>
                <hr/>
            </li>
        )

        }
    </For></ul>)
}
import { weekdays } from '../database.js';
import { useContext } from 'react';
import { DataContext } from "../context/DataContext";
import '../style/TimelineContent.css';


const TimelineContent = () => {
  const { data, setData } = useContext(DataContext);

  const getClassesFor = (i, h) => {
    let classes = [];
    data.forEach((element) => {
      if ((element.status) && (element.weekday == i) && (element.hour == h)) {
        classes.push(
          <div className="professor" style={{backgroundColor: element.color}}>
            <div className="name">
              {element.name}
            </div>
            <div className="desc">
              {element.desc}
            </div>
          </div>
        )
      }
    });

    if (classes.length === 0) {
      return (
        <div className="no-classes">
          Sem aulas
        </div>
      );
    }
    
    return classes;
  }

  const getOptions = () => {
    let table = weekdays.map((weekday, i) => {
      let weekdays_options = []

      for (let h=1400; h < 2100; h+=100) {
        let string_h = h.toString();
        let string_end_h = (h + 100).toString();
        let formated_h = string_h.slice(0,2) + ':' + string_h.slice(2,4);
        let formated_end_h = string_end_h.slice(0,2) + ':' + string_end_h.slice(2,4);
        
        weekdays_options.push(
          <div className="weekday-wrapper">
            <div className="weekday-element">
              <div className="duration">
                {formated_h}-{formated_end_h}
              </div> 
              <div className="classes">
                {getClassesFor(i, h)}
              </div>
            </div>
          </div>
        );
      }

      return (
        <>
          <div className="weekday-name">{weekday}</div>
          {weekdays_options} 
        </>
      );
    });

    return table;
  }

  return (
    <div className="timeline-wrapper">
      {getOptions()}
    </div>
  );
}


export default TimelineContent;


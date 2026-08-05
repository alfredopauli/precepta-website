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

  const getTableHeader = () => {
    return weekdays.map((element, _) => (
      <th>{element}</th>
    ));
  }

  const getTableData = () => {
    let rows = [];

    for (let h=1400; h < 2100; h+=100) {
      let columns = weekdays.map((_, i) => {
        let string_h = h.toString();
        let string_end_h = (h + 100).toString();
        let formated_h = string_h.slice(0,2) + ':' + string_h.slice(2,4);
        let formated_end_h = string_end_h.slice(0,2) + ':' + string_end_h.slice(2,4);
        
        return (
          <td>
            <div className="weekday-element">
              <div className="duration">
                {formated_h}-{formated_end_h}
              </div> 
              <div className="classes">
                {getClassesFor(i, h)}
              </div>
            </div>
          </td>
        );
      });

      rows.push(<tr>{columns}</tr>);
    }

    return rows;
  }


  return (
    <div className="timeline-wrapper">
      <table>
        <thead>
          <tr>
            {getTableHeader()}
          </tr>
        </thead>
        <tbody>
          {getTableData()}
        </tbody>
      </table>
    </div>
  );
}


export default TimelineContent;


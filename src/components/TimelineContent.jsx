import { Fragment, useState, useEffect } from 'react';
import { weekdays, hours, prohibited_hours } from '../common.js';
import supabase from '../supabase-client.js';
import '../style/TimelineContent.css';


const TimelineContent = () => {
  const [classes, setClasses] = useState([]) 
  const [teachers, setTeachers] = useState([]) 

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel("ideal_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "teachers",
        },
        (_) => {
          fetchData();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "classes",
        },
        (_) => {
          fetchData();
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, []);

  async function fetchData() {
    try {
      // Fetch 'classes' data
      const { data: newClasses, error: errorClasses } = 
        await supabase
          .from('classes')
          .select('*')
          .order("weekday", { ascending: true })
          .order("hour", { ascending: true })
          .order('teacher_id');
      if (errorClasses) throw errorClasses;
      
      // Fetch 'teachers' data
      const { data: newTeachers, error: errorTeachers } = 
        await supabase.from('teachers').select('*')
      if (errorTeachers) throw errorTeachers;

      setClasses(newClasses);
      setTeachers(newTeachers);
    } catch (error) {
        console.error(error.message);
    }
  }


  const getClassesFor = (i, h) => {
    let c = [];
    classes.forEach((element) => {
      if ((element.status) && (element.weekday == i) && (element.hour == h)) {
        let teacher = teachers.filter((teacher) => teacher.id === element.teacher_id)[0];
        c.push(
          <div key={element.id} className="professor" style={{backgroundColor: teacher.color}}>
            <div className="name">
              {teacher.name}
            </div>
            <div className="desc">
              {teacher.desc.replaceAll(' ', '').split(';').map((subject, index) => (
                <Fragment key={subject}>
                  {subject}<br /> 
                </Fragment>
              ))}
            </div>
          </div>
        )
      }
    });
 
    return c;
  }

  const getTableHeader = () => {
    return weekdays.map((element, _) => (
      <th key={element}>{element}</th>
    ));
  }

  const getTableData = () => {
    let rows = hours.map((hour, _) => {
      let empty = true;

      let columns = weekdays.map((_, i) => {
        let value = Number(hour.split("-")[0].slice(0, 2));
        let c = getClassesFor(i, value);
        empty = empty && (c.length === 0);

        let should_collapse = 
          //(c.length === 0) ||
          prohibited_hours.some(
            elem => (elem.weekday === i && elem.hour === hour)
          ) 

        //{ 
        //  (c.length === 0) ? (
        //    <div className="no-classes">
        //      Sem aulas
        //    </div>
        //  ) : (
        //    c
        //  )
        //}

        return (
          <td key={i.toString() + "-" + hour}>
            <div
              className="weekday-element"
              style={ should_collapse ? {visibility: "collapse"} : {} }
            >
              <div className="duration">
                {hour}
              </div> 
              <div className="classes">
                { 
                  (c.length === 0) ? (
                    <div className="no-classes">
                      Sem aulas
                    </div>
                  ) : (
                    c
                  )
                }
              </div>
            </div>
          </td>
        );
      });

      return <tr 
          key={hour}
          style={ empty ? {visibility: "collapse"} : {}}
        >
          {columns}
        </tr>;
    });

    return rows;
  }


  return (
    <div className="container">
      <div className="advice">
        <div className="message">
          <p style={{'font-weight': 'bold'}}>Escolheu seu horário?</p>
          <p>Mande uma mensagem no nosso WhatsApp!</p>
          <a href="https://wa.me/5511991723096">(11) 99172-3096 <i class="fa-brands fa-whatsapp"></i></a>
        </div>
      </div>
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
    </div>
  );
}


export default TimelineContent;


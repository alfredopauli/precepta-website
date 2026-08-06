import { useState, useEffect, useActionState } from 'react';
import { weekdays, times } from '../common.js';
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
              {teacher.desc}
            </div>
          </div>
        )
      }
    });

    if (c.length === 0) {
      return (
        <div className="no-classes">
          Sem aulas
        </div>
      );
    }
    
    return c;
  }

  const getTableHeader = () => {
    return weekdays.map((element, _) => (
      <th>{element}</th>
    ));
  }

  const getTableData = () => {
    let rows = [];

    for (let h=14; h < 21; h++) {
      let columns = weekdays.map((_, i) => {
        let string_h = h.toString() + ':00';
        let string_end_h = (h + 1).toString() + ':00';
        
        return (
          <td>
            <div key={i.ToString + "-" + string_h} className="weekday-element">
              <div className="duration">
                {string_h}-{string_end_h}
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


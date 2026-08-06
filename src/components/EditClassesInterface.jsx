import { useState, useEffect, useActionState } from 'react';
import '../style/EditClassesInterface.css';
import { weekdays, times } from '../common.js';
import binIcon from '../assets/bin-icon.png';
import supabase from '../supabase-client.js'


const EditClassesInterface = () => {
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
  
  // Add new class
  const [ _error, submitAction, _isPending ] = useActionState(
    async (_previousState, formData) => {
      const newData = { 
        teacher_id: formData.get('teacher'), 
        status: 1, 
        hour: formData.get('hour'), 
        weekday: formData.get('weekday')
      }
      
      const { error } = await supabase.from("classes").insert(newData);

      if (error) {
        console.error("Error: adding deal: ", error.message);
        return new Error("Failed to add deal");
      }

      return null;
    },
    null
  );

  // Toggle class status
  async function toggleClass(classID) {
    const { data, error: selectError } = await supabase
      .from('classes')
      .select('status')
      .eq("id", classID); 
    if (selectError) console.error(selectError.message);

    const { error: updateError } = await supabase
      .from("classes")
      .update({ status: !data[0].status })
      .eq("id", classID);
    if (updateError) console.error(updateError.message);
  }

  // Delete class
  async function deleteClass(classID) {
    const { error } = await supabase
      .from("classes")
      .delete()
      .eq("id", classID);
    if (error) {
      console.error(error);
    }
  }

  const getOptions = () => {
    return classes.map((element, index) => {
      let h = element.hour;
      let string_start = h.toString() + ':00';
      let string_end = (h + 1).toString() + ':00';
      let teacher = teachers.filter((teacher) => teacher.id === element.teacher_id)[0];
      
      return (
        <div className="class-item" style={{backgroundColor: teacher.color}} key={index}>
          <input 
            className="check" 
            type="checkbox" 
            checked={element.status} 
            onChange={() => toggleClass(element.id)}
          />
          <div className="name">{teacher.name}</div>
          <div className="hour">{string_start}-{string_end}</div>
          <button className="button" onClick={() => deleteClass(element.id)}>
            <img className="button__image" src={binIcon}/>
          </button>
        </div>
      );
    });
  }
  
  const getTeacherOptions = () => {
    return teachers.map((element, _) => (
      <option key={element.name} value={element.id}>
        {element.name}
      </option>
    ));
  }

  const getWeekdayOptions = () => {
    return weekdays.map((element, index) => (
        <option key={element} value={index}>
          {element}
        </option>
    ));
  }
    
  const getTimeOptions = () => {
    return times.map((element, _) => {
      let value = Number(element.split("-")[0].slice(0, 2));
      return (
        <option key={element} value={value}>
          {element}
        </option>
      );
    });
  }

  return (
    <div className="edit-wrapper">
      <form className="add-new-class-form" action={submitAction}>
        <p>Professor</p>
        <select name="teacher">
          {getTeacherOptions()}
          </select>
        <p>Dia da semana</p>
        <select name="weekday">
          {getWeekdayOptions()}
        </select>
        <p>Horário</p>
        <select name="hour">
          {getTimeOptions()}
        </select>
        <button>
          Adicionar
        </button>
      </form>
      <div className="class-container">
        {getOptions()}
      </div>
    </div>
  );
}


export default EditClassesInterface;

import supabase from '../supabase-client.js'
import { useEffect, useState, useActionState } from 'react';
import '../style/EditInterface.css';
import binIcon from '../assets/bin-icon.png';


const EditTeachersInterface = () => {
  const [teachers, setTeachers] = useState([]) 
  
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [color, setColor] = useState(
    "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
  );

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
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, []);

  async function fetchData() {
    try {
      // Fetch 'teachers' data
      const { data: newTeachers, error: errorTeachers } = 
        await supabase
          .from('teachers')
          .select('*')
          .order("id", { ascending: true })
          .order("name", { ascending: true })
      if (errorTeachers) throw errorTeachers;
      
      setTeachers(newTeachers);
    } catch (error) {
        console.error(error.message);
    }
  }
  
  // Add new teacher
  const [ _error, submitAction, _isPending ] = useActionState(
    async (_previousState, formData) => {
      const newData = { 
        name: formData.get('name'), 
        desc: formData.get('desc'),
        color: formData.get('color')
      }
      
      const { error } = await supabase.from("teachers").insert(newData);

      if (error) {
        return new Error("Failed to add new teacher");
      }

      return null;
    },
    null
  );
  
  // Delete teacher
  async function deleteTeacher(teacherID) {
    const { error } = await supabase
      .from("teachers")
      .delete()
      .eq("id", teacherID);
    if (error) {
      console.error(error);
    }
  }

  const getOptions = () => {
    return teachers.map((element, index) => {
      return (
        <div className="class-item" style={{backgroundColor: element.color}} key={index}>
          <div className="info-wrapper">
            <div className="name">{element.name}</div>
            <div className="desc">{element.desc}</div>
          </div>
          <button className="button" onClick={() => deleteTeacher(element.id)}>
            <img className="button__image" src={binIcon}/>
          </button>
        </div>
      );
    });
  }
  
  return (
    <div className="edit-wrapper">
      <form className="add-new-class-form" action={submitAction}>
        <p>Nome</p>
        <input 
          name="name" 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Descrição</p>
        <input 
          name="desc" 
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <p>Cor</p>
        <input 
          name="color" 
          type="color" 
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button type="submit">
          Adicionar
        </button>
      </form>
      <div className="class-container-wrapper">
        <div className="class-container">
          {getOptions()}
        </div>
      </div>
    </div>
  );
}


export default EditTeachersInterface;

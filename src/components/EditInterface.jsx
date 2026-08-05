import { weekdays, time } from '../database.js';
import { useContext, useActionState } from 'react';
import { DataContext } from "../context/DataContext";
import '../style/EditInterface.css';
import binIcon from '../assets/bin-icon.png';


const EditInterface = () => {
  const { data, setData } = useContext(DataContext);
  const [ _error, submitAction, _isPending ] = useActionState(
    async (_previousState, formData) => {
      const newData = {
        status: true,
        name: formData.get('name'),
        desc: formData.get('desc'),
        color: formData.get('color'),
        weekday: formData.get('weekday'),
        hour: formData.get('hour'),
      };
      setData((prev) => ([newData, ...prev]));
    }
  );

  const handleToggle = (index) => {
    setData((prev) => (
      prev.map((item, i) => (
        (index === i) ? { ...item, status: !item.status } : item
      ))
    ));
  }

  const deleteData = (removeIndex) => {
    setData((prev) => prev.filter((_, index) => index !== removeIndex));
  }

  const getOptions = () => {
    return data.map((element, index) => {
      let h = element.hour;
      let string_h = h.toString();
      let string_end_h = (h + 100).toString();
      let formated_h = string_h.slice(0,2) + ':' + string_h.slice(2,4);
      let formated_end_h = string_end_h.slice(0,2) + ':' + string_end_h.slice(2,4);
      
      return (
        <div className="class-item" style={{backgroundColor: element.color}} key={index}>
          <input className="check" type="checkbox" checked={element.status} onChange={() => handleToggle(index)}/>
          <div className="name">{element.name}</div>
          <div className="hour">{formated_h}-{formated_end_h}</div>
          <button className="button" onClick={() => deleteData(index)}>
            <img className="button__image" src={binIcon}/>
          </button>
        </div>
      );
    });
  }

  const getWeekdayOptions = () => {
    return weekdays.map((element, index) => {
      return (
        <option key={element} value={index}>
          {element}
        </option>
      );
    });
  }

  const getTimeOptions = () => {
    return time.map((element, _) => {
      let value = Number(element.split("-")[0].replace(":", ""));
      console.log(element);
      return (
        <option key={element} value={value}>
          {element}
        </option>
      );
    });
  }

  return (
    <>
      <form className="add-new-class-form" action={submitAction}>
        <p>Nome</p>
        <input name="name" type="name" />
        <p>Descrição</p>
        <input name="desc" type="desc" />
        <p>Cor</p>
        <input name="color" type="color"/>
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
    </>
  );
}


export default EditInterface;


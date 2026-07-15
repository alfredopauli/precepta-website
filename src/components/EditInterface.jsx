import { weekdays } from '../database.js';

import { useContext, useActionState } from 'react';

import { DataContext } from "../context/DataContext";

import '../style/EditInterface.css';


const EditInterface = () => {
  const { data, setData } = useContext(DataContext);
  const [ _error, submitAction, _isPending ] = useActionState(
    async (_previousState, formData) => {
      const newData = {
        status: true,
        name: formData.get('name'),
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

  const handleNewData = (data) => {
    setData((prev) => ([...prev, data]));
  }

  const getOptions = () => {
    return data.map((element, index) => {
      let h = element.hour;
      let string_h = h.toString();
      let string_end_h = (h + 100).toString();
      let formated_h = string_h.slice(0,2) + ':' + string_h.slice(2,4);
      let formated_end_h = string_end_h.slice(0,2) + ':' + string_end_h.slice(2,4);
      
      return (
        <div className="class-container-item" key={index}>
          <p>Status</p>
          <input type="checkbox" checked={element.status} onChange={() => handleToggle(index)}/>
          <p>Nome: {element.name}</p>
          <p>Horário: {formated_h}-{formated_end_h}</p>
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

  return (
    <>
      <form className="add-new-class-form" action={submitAction}>
        <p>Nome</p>
        <input name="name" type="name" />
        <p>Cor</p>
        <input name="color" type="color"/>
        <p>Dia da semana</p>
        <select name="weekday">
          {getWeekdayOptions()}
        </select>
        <p>Horário</p>
        <select name="hour">
          <option key="14:00-15:00" value="1400">14:00-15:00</option>
          <option key="15:00-16:00" value="1400">15:00-16:00</option>
          <option key="16:00-17:00" value="1400">16:00-17:00</option>
          <option key="17:00-18:00" value="1400">17:00-18:00</option>
          <option key="18:00-19:00" value="1400">18:00-19:00</option>
          <option key="19:00-20:00" value="1400">19:00-20:00</option>
          <option key="20:00-21:00" value="1400">20:00-21:00</option>
          <option key="21:00-22:00" value="1400">21:00-22:00</option>
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


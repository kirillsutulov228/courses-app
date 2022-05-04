import { Children, cloneElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Form.css';

export default function Form({ children, schema = null, title = 'Form', submitTitle = 'Submit', className, onSubmit }) {
  const { register, setError, handleSubmit, formState } = useForm({ resolver: schema, reValidateMode: 'onSubmit' });

  async function handler(data) {
    try {
      await onSubmit(data, setError);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form className={`form ${className}`} onSubmit={handleSubmit(handler)} {...register('form')}>
        <h1 className='form__title'>{title}</h1>
        {Children.map(children, (child, i) => (
          <div className='form__input-row'>
            <p className='form__input-label'>{child.props.title}</p>
            {cloneElement(child, {
              key: i,
              className: `form__input form__${child.props.type}-input`,
              ...child.props,
              ...register(child.props.name)
            })}
            {formState.errors[child.props.name] && (
              <p className='form__input-error'>{formState.errors[child.props.name].message}</p>
            )}
          </div>
        ))}
        {formState.errors['form'] && <p className='form__input-error'>{formState.errors['form'].message}</p>}
        <input className='form__submit-button' type='submit' value={submitTitle} />
      </form>
    </>
  );
}

/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Button } from 'reactstrap';
import './Todos.css';

const Todos = (props) => {
  const todos = [
    {
      id: 0,
      title: 'Google',
      handler: props.actionProvider.handleAnswerEnvironment,
    },
    {
      id: 1,
      title: 'Apple',
      handler: props.actionProvider.handleAnswerEnvironment,
    },
    {
      id: 2,
      title: 'Microsoft',
      handler: props.actionProvider.handleAnswerEnvironment,
    },
  ];

  const renderTodos = () => {
    return todos.map((tudo) => {
      return (
        <Button
          key={tudo.id}
          className="todos-widget-list-item"
          variant="contained"
          onClick={() => tudo.handler(tudo.title)}
        >
          {tudo.title}
        </Button>
      );
    });
  };

  return <div className="todos-widget">{renderTodos()}</div>;
};

export default Todos;

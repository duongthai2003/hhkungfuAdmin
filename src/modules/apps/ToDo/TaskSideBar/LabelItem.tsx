import React from 'react';
import {NavLink} from 'react-router-dom';
import {StyledTodoDots, StyledTodoLabelItem} from './index.styled';
import {LabelObjType} from '@crema/types/models/apps/Todo';

type LabelItemProps = {
  label: LabelObjType;
};

const LabelItem: React.FC<LabelItemProps> = ({label}) => {
  return (
    <StyledTodoLabelItem>
      <NavLink to={`/apps/todo/label/${label.alias}`}>
        <StyledTodoDots
          className='todo-dots'
          style={{backgroundColor: label.color}}
        />
        {label.name}
      </NavLink>
    </StyledTodoLabelItem>
  );
};

export default LabelItem;

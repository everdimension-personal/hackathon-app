import React, { useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorder } from './reorder';

const getItemStyle = (_isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export const SortableList: React.FunctionComponent<{
  items: any[];
  onChange: (items: any[]) => void;
  renderItem: (item: any, index: number) => React.ReactNode;
}> = ({ items, onChange, renderItem }) => {
  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }

      const newItems = reorder(
        items,
        result.source.index,
        result.destination.index,
      );

      onChange(newItems);
    },
    [items, onChange],
  );
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item} index={index} draggableId={item}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    )}
                  >
                    {renderItem(item, index)}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export const cartRerducer = (state: any, action: any) => {
  console.log("Current State:", state);
  console.log("Action Type:", action.type);
  console.log("Action Payload:", action.payload);
  switch (action.type) {
    case "ADD_TO_SELECTEDITEM":
      return {
        ...state,
        selecteditem: [...state.selecteditem, { ...action.payload, count: 1 }],
      };

    case "REMOVE_ITEM_FROM_CART":
      const itemIdToRemove = action.payload;
      const updatedSelectedItems = state.selecteditem.filter(
        (item: any) => item.id !== itemIdToRemove
      );
      return {
        ...state,
        selecteditem: updatedSelectedItems,
      };

    case "ADD_COUNT_CART":
        const itemcountToAdd = action.payload;
        const updatedAddedCount = state.selecteditem.map(
          (item: any) =>{
            
            if(item.id === itemcountToAdd){
                return {...item,count:item.count + 1}
            }
            return item
          }
        );
        return{
            ...state,
            // selecteditem:state.selecteditem.filter((c:any)=>c.id===action.payload?c.count+1 : c.count)
            selecteditem:updatedAddedCount
        }

    case "REMOVE_COUNT_CART":
      const itemcountToRemove = action.payload;
      const updatedRemovedCount = state.selecteditem.map((item: any) => {
        if (item.id === itemcountToRemove) {
          let removeIndividualItem = item.count > 1 ? item.count - 1 : 1;
          return { ...item, count: removeIndividualItem };
        }
        return item;
      });
      return {
        ...state,
        selecteditem:updatedRemovedCount,
        // selecteditem: state.selecteditem.filter((c:any)=>c.id===action.payload?(c.count>1?c.count-1:1):c.count)
      };

    default:
      return state;
  }
};

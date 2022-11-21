import { memo, useContext, useMemo } from "react";
import Select from "../../bootstrap/forms/Select";
import { DefaultContext } from "../../../contexts/default";
import FormGroup from "../../bootstrap/forms/FormGroup";


const SelectMenu = (props) => {

  const { menus, menuSelected, setmenuSelected } = useContext(DefaultContext);

  const options = useMemo(() => menus.map(item => ({ value: item.id, text: item.name })), [menus])

  return (
    <FormGroup id="menu" label="Cardápios" className={`${props.class ? props.class : 'col-md-4'} mb-3`}>
      <Select
        value={menuSelected}
        list={options}
        onChange={e => setmenuSelected(e.target.value)}
      />
    </FormGroup>
  );
}

export default memo(SelectMenu);
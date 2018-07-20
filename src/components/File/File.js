function FileComp(props) {
    return (
            <List.Item>
            <List.Icon name='file' />
                <List.Content>
                    <input  className = "editInput none" defaultValue = {props.data.name} onKeyDown = {props.pushEnterFunction} onBlur = {props.inputBlur} /> 
                    <List.Header data-id = {props.data.id} data-url = {props.data.url} onMouseEnter = {props.onHover} onMouseLeave = {props.offHover} onDoubleClick = {props.moveToUrl}>
                        {props.data.name}
                            <div className="replace"></div>
                            <Fragment>                           
                                <Button icon className = "hidden" color="white" data-id = {props.data.id} > 
                                    <Icon size="small" name="ellipsis horizontal" onClick = {props.folderEditBtn} data-id = {props.data.id}/>
                                        <Segment.Group compact className = "hidden"  >
                                            <Segment textAlign="center" >Copy URL</Segment>
                                            <Segment textAlign="center" onClick = {props.editName}>Edit Name</Segment>
                                            <Segment textAlign="center" onClick = {props.delete}>Delete</Segment>
                                        </Segment.Group>
                                </Button>
                            </Fragment>
                    </List.Header>
                </List.Content>
            </List.Item>
    );
}
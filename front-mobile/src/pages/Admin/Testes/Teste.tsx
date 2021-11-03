import React, { useState } from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";

const Teste: React.FC = () => {
    const [expanded, setExpanded] = useState(false);
    const roles = [
        {
            id: 1,
            auth: 'auth1'
        },
        {
            id: 2,
            auth: 'auth2'
        },
        {
            id: 3,
            auth: 'auth3'
        },
        {
            id: 4,
            auth: 'auth4'
        }
    ]
    return (

        <View>
            <ListItem.Accordion
                content={
                    <>
                        <ListItem.Content>
                            <ListItem.Title>
                                Roles
                            </ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
            >
                {
                    roles.map((role) => (
                        <ListItem key={role.id}>
                            <ListItem.Content>
                                <ListItem.Title>{role.auth}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
            </ListItem.Accordion>
        </View>
    )
}

export default Teste;
import React, { Fragment, useState } from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import Link from 'next/link';
import { mobileMenuItems } from '../navigation/menuConfig';

const MobileMenu = () => {

    const [openId, setOpenId] = useState('');

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <ul className="main_menu_list clearfix">
            {mobileMenuItems.map((item) => {
                return (
                    <ListItem className={item.title === openId ? 'active' : ''} key={item.title}>
                        {item.submenu ?
                            <Fragment>
                                <p onClick={() => setOpenId(item.title === openId ? 0 : item.title)}>{item.title}
                                    <i className={item.title === openId ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
                                </p>
                                <Collapse in={item.title === openId} timeout="auto" unmountOnExit>
                                    <List className="subMenu">
                                        <Fragment>
                                            {item.submenu.map((submenu) => (
                                                <ListItem key={submenu.title}>
                                                    <Link onClick={ClickHandler} className="active" href={submenu.href}>
                                                        {submenu.title}
                                                    </Link>
                                                </ListItem>
                                            ))}
                                        </Fragment>
                                    </List>
                                </Collapse>
                            </Fragment>
                            : <Link className="active" href={item.href}>{item.title}</Link>
                        }
                    </ListItem>
                )
            })}
        </ul>
    )
}

export default MobileMenu;


import { useLocation } from "react-router-dom";
import { Breadcrumb } from 'antd';
import './index.less'

const LogisticBreadcrumb = (props) => {
    const location = useLocation();
    const currentPath = location.pathname.substring(1);
    const currentPage = currentPath ? currentPath : 'Home';

    return (
        <Breadcrumb>
            <Breadcrumb.Item>{currentPage}</Breadcrumb.Item>
        </Breadcrumb>
    );
};

export default LogisticBreadcrumb
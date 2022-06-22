import { Breadcrumb } from 'antd';

const LogisticBreadcrumb = (props) => {
    const {currentPage} = props;
    return (
        <Breadcrumb>
            <Breadcrumb.Item>{currentPage}</Breadcrumb.Item>
        </Breadcrumb>
    );
};

export default LogisticBreadcrumb
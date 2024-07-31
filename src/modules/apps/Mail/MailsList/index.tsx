import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MailContentHeader from './MailContentHeader';
import MailListItem from './MailListItem';
import AppsPagination from '@crema/components/AppsPagination';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import AppsFooter from '@crema/components/AppsContainer/AppsFooter';
import AppList from '@crema/components/AppList';
import ListEmptyResult from '@crema/components/AppList/ListEmptyResult';
import EmailListSkeleton from '@crema/components/AppSkeleton/EmailListSkeleton';
import {
  StyledAppsMailFooter,
  StyledMailListDesktop,
  StyledMailListMobile,
} from './index.styled';
import { putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import MailListItemMobile from './MailListItemMobile';
import type { LabelObjType, MailObjType } from '@crema/types/models/apps/Mail';

type Props = {
  data: MailObjType[];
  count: number;
};
const MailsList = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [page, setPage] = useState<number>(0);
  const [filterText, onSetFilterText] = useState('');
  const { pathname } = useLocation();
  const path = pathname.split('/');
  const infoViewActionsContext = useInfoViewActionsContext();

  const [checkedMails, setCheckedMails] = useState<number[]>([]);

  const [{ apiData, loading }, { setQueryParams, setData }] =
    useGetDataApi<Props>(
      '/api/mailApp/folder/mail/List',
      undefined,
      {
        type: path[path.length - 2],
        name: path[path.length - 1],
        page: page,
      },
      false,
    );

  const [{ apiData: labelList }] = useGetDataApi<LabelObjType[]>(
    '/api/mailApp/labels/list',
  );

  useEffect(() => {
    setPage(0);
  }, [pathname]);

  useEffect(() => {
    const path = pathname.split('/');
    if (setQueryParams) {
      setQueryParams({
        type: path[path.length - 2],
        name: path[path.length - 1],
        page: page,
        checkedMails: checkedMails,
      });
    }
  }, [page, pathname, checkedMails]);

  const onChange = (page: number) => {
    setPage(page - 1);
  };

  const onChangeCheckedMails = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedMails(checkedMails.concat(id));
    } else {
      setCheckedMails(checkedMails.filter((mailId) => mailId !== id));
    }
  };

  const onViewMailDetail = (mail: MailObjType) => {
    if (mail.isRead) {
      navigate(`/apps/mail/${params.name}/${mail.id}`);
    } else {
      mail.isRead = true;
      putDataApi('/api/mailApp/mail/', infoViewActionsContext, { mail })
        .then((data) => {
          onUpdateItem(data as MailObjType);
          navigate(`/apps/mail/${params.name}/${mail.id}`);
          infoViewActionsContext.showMessage(
            mail.isRead
              ? 'Mail Marked as Read Successfully'
              : 'Mail Marked as Unread Successfully',
          );
        })
        .catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });
    }
  };

  const onChangeStarred = (checked: boolean, mail: MailObjType) => {
    putDataApi<MailObjType[]>(
      '/api/mailApp/update/starred',
      infoViewActionsContext,
      {
        mailIds: [mail.id],
        status: checked,
      },
    )
      .then((data) => {
        onUpdateItem(data[0]);
        infoViewActionsContext.showMessage(
          checked
            ? 'Mail Marked as Starred Successfully'
            : 'Mail Marked as Unstarred Successfully',
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const onUpdateItem = (data: MailObjType) => {
    if (setData) {
      setData({
        data: apiData.data.map((item: MailObjType) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        }),
        count: apiData.count,
      });
    }
  };

  const onRemoveItem = (data: MailObjType) => {
    if (setData) {
      setData({
        data: apiData.data.filter((item: MailObjType) => item.id !== data.id),
        count: apiData.count - 1,
      });
    }
  };

  return (
    <>
      <AppsHeader>
        <MailContentHeader
          checkedMails={checkedMails}
          setCheckedMails={setCheckedMails}
          onChange={onChange}
          mailList={apiData?.data}
          totalMails={apiData?.count}
          page={page + 1}
          path={path}
          filterText={filterText}
          onSetFilterText={onSetFilterText}
          setData={setData}
        />
      </AppsHeader>
      <AppsContent>
        <StyledMailListDesktop>
          <AppList
            data={apiData?.data?.filter((item: MailObjType) =>
              item.subject.toLowerCase().includes(filterText.toLowerCase()),
            )}
            ListEmptyComponent={
              <ListEmptyResult
                loading={loading}
                placeholder={<EmailListSkeleton />}
              />
            }
            renderItem={(mail) => (
              <MailListItem
                mail={mail}
                key={mail.id}
                labelList={labelList}
                onChangeCheckedMails={onChangeCheckedMails}
                checkedMails={checkedMails}
                onViewMailDetail={onViewMailDetail}
                onChangeStarred={onChangeStarred}
                onRemoveItem={onRemoveItem}
                onUpdateItem={onUpdateItem}
              />
            )}
          />
        </StyledMailListDesktop>
        <StyledMailListMobile>
          <AppList
            data={apiData?.data?.filter((item: MailObjType) =>
              item.subject.toLowerCase().includes(filterText.toLowerCase()),
            )}
            ListEmptyComponent={
              <ListEmptyResult
                loading={loading}
                placeholder={<EmailListSkeleton />}
              />
            }
            renderItem={(mail) => (
              <MailListItemMobile
                mail={mail}
                key={mail.id}
                labelList={labelList}
                onViewMailDetail={onViewMailDetail}
                onChangeStarred={onChangeStarred}
                checkedMails={checkedMails}
                onChangeCheckedMails={onChangeCheckedMails}
              />
            )}
          />
        </StyledMailListMobile>
      </AppsContent>
      {apiData?.data?.length > 0 ? (
        <StyledAppsMailFooter>
          <AppsFooter>
            <AppsPagination
              count={apiData?.count}
              page={page}
              onChange={onChange}
            />
          </AppsFooter>
        </StyledAppsMailFooter>
      ) : null}
    </>
  );
};

export default MailsList;

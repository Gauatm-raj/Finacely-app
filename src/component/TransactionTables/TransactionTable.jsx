import { Radio, Select, Table } from "antd";

import React, { useState } from "react";
import Button from "../Button/Button";
import searchImg from "../../assets/searchImg.svg";

import { usePapaParse } from 'react-papaparse';
import { parse } from "papaparse";
import { toast } from "react-toastify";

const TransactionTable = ({ transaction,addTransaction,fetchTransaction }) => {
  //const processedData = Array.isArray(transaction) ? transaction : [];

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const { Option } = Select;
  const { jsonToCSV } = usePapaParse();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];
  let filterTransaction = transaction.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  let sortedTransaction = filterTransaction.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });
 // console.log(sortedTransaction);

  function exportCsv() {
    const csv = jsonToCSV({
      fields: ["name", "amount", "type", "date", "tag"],
      data:transaction,
    });
    let data = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    let csvURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "transaction.csv");
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  function importCsv(e){
    e.preventDefault();
    try {
      parse(e.target.files[0],{
        header:true,
        complete: async function(results){
          for(const t of results.data){
            console.log(results.data);
            const newtrans={...t,amount:parseFloat(t.amount)}
            await addTransaction(newtrans,true);
          };
        },
      });
      toast.success("All transaction added")
      fetchTransaction();
      e.target.files=null;
    } catch (error) {
      toast.error(error.message);
    }

  }

  return (
    <>
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem",
          padding: "0rem 1rem",
        }}
      >
        <div className="input-flex">
          <img
            style={{ width: "2rem", height: "2rem" }}
            src={searchImg}
            alt=""
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search By Name"
          />
        </div>

        <Select
          className="select-filter"
          style={{ width: "20%" }}
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
          padding: "0rem 1rem",
        }}
      >
        <h2>Transaction</h2>
        <Radio.Group
          className=""
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Sort By Date</Radio.Button>
          <Radio.Button value="amount">Sort By Amount</Radio.Button>
        </Radio.Group>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Button text={"Export CSV"} onClick={exportCsv} />
          <label  htmlFor="file-csv" className="btn btn-blue">Import CSV</label>
          <input type="file" accept=".csv" required onChange={importCsv} style={{display:"none"}} id="file-csv" />
          {/* <Button text={"Import CSV"} blue={true} /> */}
        </div>
      </div>
      <Table dataSource={sortedTransaction} columns={columns} />
    </>
  );
};

export default TransactionTable;

import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import { Button, Chip } from "react-native-paper";
import { format } from "date-fns";

export interface Complaint {
  user: string;
  description: string;
  createdAt: string;
  category: string;
  status: string;
}

interface Props {
  complaints: Complaint[];
  onSelectComplaint: (complaint: Complaint) => void;
}

const formatId = (index: number) => {
  return `00${index + 1}`.slice(-3);
};

const statusColor = (status: string) => {
  switch (status) {
    case "Resolved":
      return "#4caf50";
    case "In Progress":
      return "#2196f3";
    default:
      return "#f44336";
  }
};

const CustomTable = ({ complaints, onSelectComplaint }: Props) => {
  const header = () => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.id]}>ID</Text>
      <Text style={[styles.cell, styles.description]}>Description</Text>
      <Text style={[styles.cell, styles.category]}>Category</Text>
      <Text style={[styles.cell, styles.status]}>Status</Text>
      <Text style={[styles.cell, styles.date]}>Date</Text>
      <Text style={[styles.cell, styles.action]}>Action</Text>
    </View>
  );

  const renderItem = ({ item, index }: { item: Complaint; index: number }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.id]}>{formatId(index)}</Text>
      <Text style={[styles.cell, styles.description]}>
        {item.description.length > 40
          ? item.description.slice(0, 40) + "..."
          : item.description}
      </Text>
      <Text style={[styles.cell, styles.category]}>{item.category}</Text>
      <View style={[styles.cell, styles.status]}>
        <Chip
          style={[styles.chip, { backgroundColor: statusColor(item.status) }]}
          textStyle={styles.chipText}
        >
          {item.status}
        </Chip>
      </View>
      <Text style={[styles.cell, styles.date]}>
        {format(new Date(item.createdAt), "hh:mm a, MM-dd-yyyy")}
      </Text>
      <View style={[styles.cell, styles.action]}>
        <Button
          mode="outlined"
          onPress={() => onSelectComplaint(item)}
          compact
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          View
        </Button>
      </View>
    </View>
  );

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator>
      <View>
        {header()}
        <FlatList
          data={complaints}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#444",
    borderBottomWidth: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  cell: {
    paddingHorizontal: 8,
    color: "#eee",
  },
  id: {
    width: 50,
  },
  description: {
    width: 220,
  },
  category: {
    width: 100,
  },
  status: {
    width: 120,
  },
  date: {
    width: 180,
  },
  action: {
    width: 100,
  },
  chip: {
    alignSelf: "flex-start",
  },
  chipText: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    borderColor: "#ff784b",
  },
  buttonLabel: {
    color: "#ff784b",
    fontSize: 12,
  },
});

export default CustomTable;

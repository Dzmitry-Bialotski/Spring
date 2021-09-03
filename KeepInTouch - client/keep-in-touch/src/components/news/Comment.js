import { Grid, Paper} from "@material-ui/core";
import React from "react";

export function Comment({commentItem}){
  const fullDate = new Date(commentItem.publishedAt);
  const date = fullDate.toString().split(" ");
  const hour = parseInt(date[4].substring(0, 2));
  const time = hour > 12;

  return(
    <Paper style={{ padding: "30px 20px", marginTop: 10, width: '100%' }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>{commentItem.author}</h4>
          <p style={{ textAlign: "left" }}>
            {commentItem.content}
          </p>
          <span className="muted">
            {time
              ? `${hour - 12}:${date[4].substring(3, 5)} pm`
              : `${hour}:${date[4].substring(3, 5)} am`}{" "}
            on {date[2]} {date[1]} {date[3]}, {date[0]}
            </span>
        </Grid>
      </Grid>
    </Paper>
  )
}
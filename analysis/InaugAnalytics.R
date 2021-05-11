#library(tidytext)
#library(tidyverse

#install.packages("tidytext")
#install.packages("tidyverse")
#install.packages("stringr")

install.packages("ggplot2")
install.packageslibrary("plotly")
install.packageslibrary("scales")
install.packageslibrary("knitr")
install.packageslibrary("DT")
install.packageslibrary("widyr")
install.packageslibrary("ggraph")

install.packageslibrary("readability")
library(ggplot2)
library(plotly)
library(scales)
library(knitr)
library(DT)
library(widyr)
library(ggraph)



library("stringr")
library("tidytext")
library("tidyverse")

setwd("~/Documents/MajorStudio2/analytics")
inaug_text <- read.csv("speeches2.csv",header=T,stringsAsFactors = F)


inaug_stats <- read.csv("combinedsheet_reduced.csv",header=T,stringsAsFactors = F)

print(inaug_stats)

#inaug_k <- inaug_stats[, c('Item', 'Activity', 'Optimism', 'Certainty',	'Realism', 'Commonality')]
inaug_k <- inaug_stats[, c('Activity', 'Optimism', 'Certainty',	'Realism', 'Commonality')]



summary(inaug_k)

View(inaug_k)

print(inaug_k)
inaug_k_s <- scale(inaug_k)

print(inaug_k_s)
install.packages("factoextra")
library(factoextra)
library(cluster)

fviz_nbclust(inaug_k_s, kmeans, method = "wss")

fviz_nbclust(inaug_k, kmeans, method = "wss")





gap_stat <- clusGap(inaug_k,
                    FUN = kmeans,
                    nstart = 25,
                    K.max = 10,
                    B = 50)

#plot number of clusters vs. gap statistic
fviz_gap_stat(gap_stat)
km <- kmeans(inaug_k_s, centers = 4, nstart = 25)

print(inaug_k_s)
print()
print(km)
fviz_cluster(km,repel=TRUE,data=inaug_k_s)



data <-inaug_k_s
print(data)
dim(data)

pca <- stats::prcomp(data, scale = FALSE, center = FALSE)
ind <- facto_summarize(pca, element = "ind", result = "coord", axes = c(1, 2))

print (ind)
eig <- get_eigenvalue(pca)[axes,2]
if(is.null(xlab)) xlab = paste0("Dim", axes[1], " (", round(eig[1],1), "%)") 
if(is.null(ylab)) ylab = paste0("Dim", axes[2], " (", round(eig[2], 1),"%)")
}








#
#inaug_copy <- inaug
#View(inaug_copy)

unnest_tokens

df[, c('ID', 'store')]


# ---------- PRELIMINARY STEPS ----------

#dim(inaug_copy)
#names(inaug_copy)
#inaug_copy$year <- as.numeric(str_sub(inaug$Date,start = -4, end=-1))
#View(inaug_copy)


#inaug_copy %>%
#  unnest_tokens(word,text) %>%
  
#tidy_inaug_words <-   inaug_copy %>% unnest_tokens(word,text)

#
#tidy_inaug_summary <- tidy_inaug_words %>% group_by(year,Name) %>% summarise(n_words=n()) 

#view(tidy_inaug_summary)
 
#tidy_inaug_words <-   inaug_copy %>% unnest_tokens(word,text) group_by(year,Name) %>%
#  summarise(n_words=n()) %>%
#  mutate(mean_words=mean(n_words)) %>%
  


